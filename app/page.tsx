"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 dark:border-gray-800 sticky top-0 z-10">
        <Link className="flex items-center justify-center" href="/">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text"
          >
            Định Hướng Nghề Nghiệp
          </motion.span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-teal-500 transition-colors" href="/about">
            Giới thiệu
          </Link>
          <Link className="text-sm font-medium hover:text-teal-500 transition-colors" href="/contact">
            Liên hệ
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text">
                    Khám Phá Nghề Nghiệp Phù Hợp Với Bạn
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-400">
                    Làm bài kiểm tra tính cách MBTI để xác định kiểu tính cách của bạn và nhận gợi ý về nghề nghiệp phù
                    hợp với đặc điểm tính cách của bạn.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/test">
                    <Button
                      size="lg"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Bắt Đầu Kiểm Tra
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-teal-500 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-950/50 transition-all duration-300"
                    >
                      Tìm Hiểu Thêm
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 opacity-75 blur-xl animate-pulse"></div>
                <img
                  alt="Kiểm tra tính cách"
                  className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-xl"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fyR0UW7mEAtG3AoMuFG2zcu1xFF9oi.png"
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-teal-500/10 to-blue-500/10 dark:from-teal-900/20 dark:to-blue-900/20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-teal-500/20 px-3 py-1 text-sm text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 mb-2">
                  <Sparkles className="inline-block w-4 h-4 mr-1" /> Quy trình đơn giản
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">
                  Cách Thức Hoạt Động
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Bài đánh giá được thiết kế theo phương pháp khoa học giúp bạn hiểu rõ đặc điểm tính cách và kết nối
                  chúng với con đường nghề nghiệp lý tưởng.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  step: 1,
                  title: "Làm Bài Kiểm Tra",
                  description:
                    "Trả lời một loạt câu hỏi được thiết kế để đánh giá đặc điểm tính cách và sở thích của bạn.",
                  delay: 0.2,
                },
                {
                  step: 2,
                  title: "Nhận Kết Quả",
                  description:
                    "Khám phá kiểu tính cách MBTI của bạn, cùng với những hiểu biết chi tiết về tính cách của bạn.",
                  delay: 0.4,
                },
                {
                  step: 3,
                  title: "Khám Phá Nghề Nghiệp",
                  description:
                    "Xem các gợi ý về nghề nghiệp và trường học phù hợp với kiểu tính cách và thế mạnh của bạn.",
                  delay: 0.6,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: item.delay }}
                  viewport={{ once: true }}
                  className="flex flex-col justify-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-blue-500 text-white text-xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
  <div className="container px-4 md:px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center space-y-4 text-center"
    >
      <div className="space-y-2">
        <div className="inline-block rounded-lg bg-blue-500/20 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-2">
          Trải nghiệm người dùng
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">
          Phản Hồi Từ Người Dùng
        </h2>
        <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Xem những gì người khác đã khám phá về bản thân thông qua bài đánh giá tính cách của chúng tôi.
        </p>
      </div>
    </motion.div>
    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
      {[
        {
          quote:
            "Bài đánh giá MBTI này giúp tôi hiểu rõ hơn về bản thân và lý do tại sao tôi phù hợp với một số công việc hơn những công việc khác. Tôi đã tìm thấy hướng đi mới cho sự nghiệp của mình!",
          name: "Minh Anh",
          role: "INFJ - Người Ủng Hộ",
          delay: 0.2,
          avatar: "https://cdn.daibieunhandan.vn/images/989b9ec317100b858660ab5d6d5cab4fade6c1b7e170d59e3b42176420dbaf38bee2ffacffba4022a807572739f2d433/nth-4698.jpg",
        },
        {
          quote:
            "Tôi đã luôn cảm thấy khó khăn trong việc chọn nghề nghiệp phù hợp. Bài kiểm tra này đã giúp tôi hiểu rõ điểm mạnh và sở thích của mình, từ đó đưa ra quyết định đúng đắn.",
          name: "Quang Huy",
          role: "ENTJ - Chỉ Huy",
          delay: 0.4,
          avatar: "https://vietgiao.edu.vn/wp-content/uploads/2023/04/8290ec1bec7933276a68.jpg",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: item.delay }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-4 rounded-xl border border-teal-100 bg-white p-6 shadow-lg dark:border-teal-800 dark:bg-gray-950"
        >
          <div className="relative">
            <svg
              className="absolute -top-6 -left-6 h-12 w-12 text-teal-200 dark:text-teal-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 relative z-10">{item.quote}</p>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src={item.avatar}
              alt={item.name}
              className="rounded-full h-10 w-10 object-cover"
            />
            <div>
              <h3 className="text-lg font-bold text-teal-700 dark:text-teal-300">{item.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{item.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      </main>
      <footer className="w-full py-6 px-4 md:px-6 border-t bg-white dark:bg-gray-950 dark:border-gray-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-teal-600 dark:text-teal-400">Định Hướng Nghề Nghiệp</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Giúp bạn khám phá nghề nghiệp phù hợp với tính cách của mình thông qua bài kiểm tra MBTI.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-teal-600 dark:text-teal-400">Liên kết</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/test"
                    className="text-sm text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
                  >
                    Bài kiểm tra
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-teal-600 dark:text-teal-400">Theo dõi</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/duy.nguyenminh.56679/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/duy.nhobe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2025 Định Hướng Nghề Nghiệp. Bản quyền thuộc về{" "}
              <a
                href="https://minhduyy.id.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:underline"
              >
                minhduyy.id.vn
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

