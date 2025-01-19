import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
interface Donation {
  donorName: string;
  amount: number;
  message: string;
}
function DonationViewComponent({ apiUrl }: { apiUrl: string }) {
  const { data: donations } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/api/donation/getall?page=1&limit=5`);
      const { data } = await response.json();
      return data as Donation[];
    },
  });
  return <div className="flex flex-col p-4 rounded-lg gap-2 bg-white/20 backdrop-blur-sm items-center h-full overflow-y-auto shadow-lg">
    <h1 className="text-2xl font-normal text-gray-800">5 Donasi terakhir</h1>
    {donations?.map((donation: Donation, index: number) => <DonationCard key={index} {...donation} />)}
  </div>;
}

function DonationCard({ donorName, amount, message }: { donorName: string; amount: number; message: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 max-w-xl w-full">
      <blockquote>
        <p className="text-lg text-gray-800 italic leading-relaxed mb-2">
          "{message}"
        </p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="text-gray-700 font-medium">— {donorName + " "}</span>

          <span className="text-sm text-gray-500 mt-1">
            baru saja menyumbang Rp {amount.toLocaleString('id-ID')}
          </span>
        </p>
      </blockquote>
    </div>
  );
}

export default function DonationView({ apiUrl }: { apiUrl: string }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <DonationViewComponent apiUrl={apiUrl} />
    </QueryClientProvider>
  );
}
