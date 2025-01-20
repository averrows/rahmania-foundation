"use client"

import { QueryClientProvider, useQuery } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Gift, Loader2 } from "lucide-react"

interface Donation {
  donorName: string
  amount: number
  message: string
}

function DonationViewComponent({ apiUrl }: { apiUrl: string }) {
  const {
    data: donations,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/api/donation/getall?page=1&limit=5`)
      const { data } = await response.json()
      return data as Donation[]
    },
  })

  if (isLoading) {
    return <LoadingState />
  }

  if (error || !donations || donations.length === 0) {
    return <EmptyState />
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">5 Donasi Terakhir</h2>
        <ScrollArea className="max-h-[calc(100vh-150px)] pr-4">
          {donations.map((donation, index) => (
            <DonationCard key={index} {...donation} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function DonationCard({ donorName, amount, message }: Donation) {
  return (
    <Card className="mb-6 border border-primary/10">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start space-x-4 sm:space-x-6">
          <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-primary mt-1 flex-shrink-0" />
          <div>
            <blockquote className="text-sm sm:text-base text-muted-foreground italic mb-2 sm:mb-3">
              "{message}"
            </blockquote>
            <p className="text-sm sm:text-base text-foreground">
              <span className="font-medium">{donorName}</span> baru saja menyumbang{" "}
              <span className="font-medium text-primary">Rp {amount.toLocaleString("id-ID")}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <Card className="w-full max-w-3xl mx-auto border-2 border-primary/20 shadow-lg">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col items-center justify-center sm:h-[400px] md:h-[500px] text-center">
          <Gift className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-primary mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-2 sm:mb-3">
            Belum ada donasi
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md">
            Jadilah yang pertama untuk memberikan donasi dan mendukung kami!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function LoadingState() {
  return (
    <Card className="w-full max-w-3xl mx-auto border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col items-center justify-center sm:h-[500px] text-center">
          <Loader2 className="h-16 w-16 sm:h-20 sm:w-20 text-primary mb-6 animate-spin" />
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">Loading...</h2>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DonationView({ apiUrl }: { apiUrl: string }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <DonationViewComponent apiUrl={apiUrl} />
    </QueryClientProvider>
  )
}