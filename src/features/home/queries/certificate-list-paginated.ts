import { API } from "@/lib/_api";
import type { Paginated, QuerySearch, User } from "@/lib/model";
import { useQuery } from "@tanstack/react-query";

export function useCertificateListPaginatedQuery(query: Partial<QuerySearch>) {
  const isEnabled = Boolean(
    query.search?.trim() && query?.search?.trim()?.length > 0
  );

  return useQuery({
    queryKey: ["certificate-list-paginated", query],
    queryFn: async () => {
      const route = "/certificates";
      const { data } = await API.get<Paginated<User>>(route, {
        params: {
          ...query,
        },
      });
      return { data: data.data, meta: data.meta };
    },
    enabled: isEnabled,
  });
}
