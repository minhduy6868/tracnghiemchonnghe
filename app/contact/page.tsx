import Link from "next/link"
import { Mail, Globe, Instagram, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-xl">Định Hướng Nghề Nghiệp</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Trang chủ
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/test">
            Kiểm tra
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Liên Hệ</h1>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, hãy liên hệ với chúng tôi.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Liên Hệ</CardTitle>
              <CardDescription>
                Nếu bạn có vấn đề gì hoặc cần hỗ trợ, hãy liên hệ với chúng tôi qua các kênh sau:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Website</h3>
                      <a
                        href="https://minhduyy.id.vn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                      >
                        minhduyy.id.vn
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a
                        href="mailto:cocoloto997@gmail.com"
                        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                      >
                        cocoloto997@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Instagram className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Instagram</h3>
                      <a
                        href="https://instagram.com/duy.nhobe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                      >
                        @duy.nhobe
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Gửi Phản Hồi</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Chúng tôi luôn mong muốn nhận được phản hồi từ bạn để cải thiện trải nghiệm người dùng.
                  </p>
                  <form className="space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Họ và tên
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Nhập họ và tên của bạn"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Nhập email của bạn"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Nội dung
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Nhập nội dung phản hồi của bạn"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Gửi phản hồi
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/">
              <Button variant="outline" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang chủ
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Định Hướng Nghề Nghiệp. Đã đăng ký bản quyền.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Điều khoản dịch vụ
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Chính sách bảo mật
          </Link>
        </nav>
      </footer>
    </div>
  )
}

