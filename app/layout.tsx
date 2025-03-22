import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trắc nghiệm chọn nghề ',
  description: 'Cùng làm trắc nghiệm tính cách để biết mình thuộc loại tính cách nào, chọn ngành nghề đúng',
  generator: 'minh duyy nè!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
