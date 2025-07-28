import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Certificate } from "@/lib/model";
import { cn } from "@/lib/utils";
import { useRouter, useSearch } from "@tanstack/react-router";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  Rotate3dIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useCertificateListPaginatedQuery } from "./queries/certificate-list-paginated";

const CertificateStatusDeliveryMapper = {
  DELIVERED: {
    label: "Entregue",
    className: "text-green-500 bg-green-100",
    icon: CheckCircleIcon,
  },
  AVAILABLE: {
    label: "Disponível",
    className: "text-yellow-500 bg-yellow-100",
    icon: AlertCircleIcon,
  },
};

const CertificateStatusCorrectionMapper = {
  IN_CORRECTION: {
    label: "Em Correção",
    className: "text-yellow-500 bg-yellow-100",
    icon: ClockIcon,
  },
  NEEDS_CORRECTION: {
    label: "Precisa Correção",
    className: "text-red-500 bg-red-100",
    icon: AlertCircleIcon,
  },
  DOES_NOT_NEED_CORRECTION: {
    label: "Nao Precisa Correção",
    className: "text-green-500 bg-green-100",
    icon: FileTextIcon,
  },
};

export function HomePage() {
  const { search } = useSearch({ from: "/" });
  const router = useRouter();

  // Só executa a query se houver um valor de busca válido
  const hasValidSearch = Boolean(search?.trim() && search.trim().length > 0);

  const response = useCertificateListPaginatedQuery({
    search: hasValidSearch ? search : undefined,
    perPage: 5,
  });

  const form = useForm();

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col h-full overflow-hidden">
      <div className="container mx-auto px-4 py-4 max-w-5xl flex flex-col gap-4 flex-shrink-0 p-2">
        <div className="text-center ">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mb-4">
            <Rotate3dIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">BuscaCert</h1>
          <p className="text-lg text-gray-600">
            Consulte seus certificados de forma rápida e segura
          </p>
        </div>

        <Form {...form}>
          <form
            className="inline-flex gap-4 items-end"
            onSubmit={form.handleSubmit((data) => {
              const searchValue = data.name.trim();

              if (searchValue) {
                // Se tem valor, navega com o search param
                router.navigate({
                  to: "/",
                  search: { search: searchValue },
                });
              } else {
                // Se não tem valor, remove o query param
                router.navigate({
                  to: "/",
                  search: {
                    search: undefined,
                  },
                });
              }
            })}
          >
            <FormField
              control={form.control}
              defaultValue={search ?? ""}
              name="name"
              render={({ field: { onChange, ...field } }) => (
                <FormItem className="flex-1 w-full flex flex-col">
                  <FormLabel className="sr-only">Seu nome</FormLabel>
                  <FormControl>
                    <div className="relative flex-1">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Digite seu nome completo"
                        className="pl-10 h-10 text-lg !uppercase"
                        onChange={(event) => {
                          const value = event.target.value;
                          onChange(value);

                          // Se o input ficar vazio, remove o query param imediatamente
                          if (!value.trim()) {
                            router.navigate({
                              to: "/",
                              search: {
                                search: undefined,
                              },
                            });
                          }
                        }}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-destructive text-right" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              // disabled={response.status === "pending"}
              className="disabled:cursor-not-allowed disabled:bg-gray-400 flex items-center justify-center h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              <SearchIcon className="w-4 h-4" />
              <span>Buscar</span>
            </Button>
          </form>
        </Form>
      </div>

      {/* Estado de carregamento */}
      {hasValidSearch && response.status === "pending" && (
        <div className="container mx-auto px-4 py-4 max-w-5xl gap-4 flex-1 flex flex-col">
          <div className="inline-flex items-center gap-3 text-gray-600">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-lg">Consultando certificados...</span>
          </div>
        </div>
      )}

      {hasValidSearch &&
        response.status === "success" &&
        response.data &&
        response.data.data.length > 0 && (
          <div className="container mx-auto px-4 py-4 max-w-5xl gap-4 flex flex-col sm:flex-row justify-between">
            <div className="flex items-center gap-3">
              <FileTextIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Certificados Encontrados
              </h2>
            </div>
            <div className="inline-flex justify-between gap-4 items-center">
              <div className="text-sm font-medium">
                {response.data.meta.total}{" "}
                {response.data.meta.total === 1
                  ? "resultado encontrado"
                  : "resultados encontrados"}
              </div>

              {/* Informações de paginação */}
              {response.data.meta.total > 0 && (
                <Badge variant="outline" className="text-sm text-gray-600">
                  Página {response.data.meta.currentPage} de{" "}
                  {response.data.meta.lastPage}
                </Badge>
              )}
            </div>
          </div>
        )}

      {/* Nenhum resultado encontrado */}
      {hasValidSearch &&
        response.status === "success" &&
        response.data &&
        response.data.data.length === 0 && (
          <div className="container mx-auto px-4 py-4 max-w-5xl gap-4 flex-1 flex flex-col">
            <Card className="text-center py-12 border-dashed border-2 border-gray-300">
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileTextIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Nenhum certificado encontrado
                    </h3>
                    <p className="text-gray-600">
                      Verifique se o nome foi digitado corretamente ou tente uma
                      busca diferente.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      {/* Estado inicial - instruções */}
      {!hasValidSearch && (
        <div className="container mx-auto px-4 py-4 max-w-5xl gap-4 flex-1 flex flex-col">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <SearchIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Como buscar seus certificados
                  </h3>
                  <p className="text-blue-700">
                    Digite seu nome completo no campo acima e clique em "Buscar"
                    para visualizar todos os seus certificados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 max-w-5xl gap-4 flex-1 flex flex-col min-h-0 overflow-auto relative">
        {/* Resultados encontrados */}
        {hasValidSearch &&
          response.status === "success" &&
          response.data &&
          response.data.data.length > 0 && (
            <div className="animate-fade-in">
              <div className="space-y-8 ">
                {response.data.data.map((user) => (
                  <div key={user.id} className="space-y-4">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                      <UserIcon className="w-5 h-5 text-gray-500" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.name}
                      </h3>
                      <Badge variant="secondary">
                        {user.certificates.length}{" "}
                        {user.certificates.length === 1
                          ? "certificado"
                          : "certificados"}
                      </Badge>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                      {user.certificates.map((certificate: Certificate) => {
                        const statusDelivery =
                          CertificateStatusDeliveryMapper[
                            certificate.statusDelivery
                          ];

                        const statusCorrection =
                          CertificateStatusCorrectionMapper[
                            certificate.statusCorrection
                          ];

                        return (
                          <Card
                            key={certificate.id}
                            className="hover:shadow-md transition-shadow p-4 gap-1"
                          >
                            <CardHeader className="p-0">
                              <CardTitle className="text-md font-semibold text-gray-900 leading-tight">
                                {certificate.course}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 inline-flex gap-4">
                              <div className="inline-flex items-center gap-2">
                                <span className="text-muted-foreground text-sm font-bold">
                                  Status:{" "}
                                </span>
                                <Badge
                                  className={cn(
                                    "flex items-center gap-1",
                                    statusDelivery.className
                                  )}
                                >
                                  <statusDelivery.icon className="w-3 h-3" />
                                  {statusDelivery.label}
                                </Badge>
                                {certificate.statusCorrection !==
                                  "DOES_NOT_NEED_CORRECTION" && (
                                  <Badge
                                    className={cn(
                                      "flex items-center gap-1",
                                      statusCorrection.className
                                    )}
                                  >
                                    <statusCorrection.icon className="w-3 h-3" />
                                    {statusCorrection.label}
                                  </Badge>
                                )}
                              </div>

                              <div className="inline-flex items-center gap-2">
                                <span className="text-muted-foreground text-sm font-bold">
                                  Ano:{" "}
                                </span>
                                <Badge className="flex items-center gap-1 bg-gray-100 text-gray-600">
                                  <ClockIcon className="w-4 h-4" />
                                  {certificate.year}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* Footer */}
      <footer className="border-t  flex-shrink-0 bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <div className="text-center">
            <p className="text-sm mb-2">Uma parceria entre</p>
            <div className="flex flex-row items-center justify-center gap-4">
              <a
                href="https://www.maiyu.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2  transition-colors group hover:underline"
              >
                <span className="font-semibold">Maiyu SH</span>
              </a>

              <a
                href="https://hotsite.cetam.am.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2  transition-colors group hover:underline"
              >
                <span className="font-semibold">CETAM BC</span>
              </a>
            </div>

            <div className="mt-4 pt-4 border-t-gray-600 border-t">
              <p className="text-xs opacity-80">
                © {new Date().getFullYear()} BuscaCert. Todos os direitos
                reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
