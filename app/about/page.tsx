"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function AboutPage() {
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
          <Link className="text-sm font-medium hover:text-teal-500 transition-colors" href="/">
            Trang chủ
          </Link>
          <Link className="text-sm font-medium hover:text-teal-500 transition-colors" href="/contact">
            Liên hệ
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center space-y-2"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">
              Về Bài Kiểm Tra Tính Cách
            </h1>
            <p className="text-gray-600 dark:text-gray-400 md:text-xl">
              Hiểu rõ hơn về phương pháp đánh giá tính cách MBTI và cách nó giúp bạn tìm ra nghề nghiệp phù hợp.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300">
              Chỉ Số Tính Cách Myers-Briggs (MBTI)
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Chỉ số tính cách Myers-Briggs (MBTI) là một công cụ đánh giá tâm lý được phát triển bởi Isabel Briggs
              Myers và mẹ của bà, Katharine Cook Briggs, dựa trên các lý thuyết của Carl Jung. MBTI giúp xác định cách
              mọi người nhận thức thế giới và đưa ra quyết định.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex justify-center my-8"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 opacity-75 blur-sm"></div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fyR0UW7mEAtG3AoMuFG2zcu1xFF9oi.png"
                  alt="Các loại tính cách MBTI"
                  className="relative rounded-lg max-w-full h-auto shadow-xl"
                />
              </div>
            </motion.div>

            <h3 className="text-xl font-bold mt-6 text-teal-700 dark:text-teal-300">Bốn Cặp Đặc Điểm Tính Cách</h3>

            {[
              {
                title: "Hướng Ngoại (Extroversion) vs Hướng Nội (Introversion)",
                description: "Cách bạn tương tác với thế giới và lấy năng lượng",
                left: {
                  title: "Người Hướng Ngoại (E)",
                  points: [
                    "Lấy năng lượng từ việc tương tác với người khác",
                    "Thích giao tiếp và làm việc nhóm",
                    "Thường nói trước, suy nghĩ sau",
                    "Có nhiều bạn bè và mối quan hệ xã hội rộng",
                  ],
                },
                right: {
                  title: "Người Hướng Nội (I)",
                  points: [
                    "Lấy năng lượng từ thời gian một mình",
                    "Thích suy nghĩ sâu sắc và làm việc độc lập",
                    "Thường suy nghĩ trước, nói sau",
                    "Có ít bạn bè nhưng mối quan hệ sâu sắc",
                  ],
                },
                color: "blue",
              },
              {
                title: "Thực Tế (Sensing) vs Trực Quan (Intuition)",
                description: "Cách bạn thu thập thông tin và nhìn nhận thế giới",
                left: {
                  title: "Người Thực Tế (S)",
                  points: [
                    "Tập trung vào thực tế và chi tiết cụ thể",
                    "Tin tưởng vào kinh nghiệm và dữ liệu thực tế",
                    "Thích các hướng dẫn rõ ràng và cụ thể",
                    "Sống trong hiện tại và thực tế",
                  ],
                },
                right: {
                  title: "Người Trực Quan (N)",
                  points: [
                    "Tập trung vào ý tưởng, mô hình và khả năng",
                    "Thích tìm kiếm các mối liên hệ và ý nghĩa sâu xa",
                    "Thích sự sáng tạo và đổi mới",
                    "Hướng về tương lai và các khả năng",
                  ],
                },
                color: "green",
              },
              {
                title: "Lý Trí (Thinking) vs Cảm Tính (Feeling)",
                description: "Cách bạn đưa ra quyết định",
                left: {
                  title: "Người Lý Trí (T)",
                  points: [
                    "Đưa ra quyết định dựa trên logic và phân tích",
                    "Tìm kiếm sự nhất quán và công bằng khách quan",
                    "Có thể bị coi là lạnh lùng hoặc vô cảm",
                    "Tập trung vào hiệu quả và kết quả",
                  ],
                },
                right: {
                  title: "Người Cảm Tính (F)",
                  points: [
                    "Đưa ra quyết định dựa trên giá trị và cảm xúc",
                    "Tìm kiếm sự hài hòa và đồng thuận",
                    "Thường được coi là ấm áp và đồng cảm",
                    "Tập trung vào tác động đến con người",
                  ],
                },
                color: "red",
              },
              {
                title: "Nguyên Tắc (Judging) vs Linh Hoạt (Perceiving)",
                description: "Cách bạn tiếp cận cuộc sống và công việc",
                left: {
                  title: "Người Nguyên Tắc (J)",
                  points: [
                    "Thích lập kế hoạch và tổ chức",
                    "Ưa thích cấu trúc và quyết định rõ ràng",
                    "Làm việc có hệ thống và đúng hạn",
                    "Thích kiểm soát và hoàn thành công việc",
                  ],
                },
                right: {
                  title: "Người Linh Hoạt (P)",
                  points: [
                    "Thích sự linh hoạt và tự do",
                    "Thích khám phá các lựa chọn mới",
                    "Làm việc theo cảm hứng và thích ứng nhanh",
                    "Thoải mái với sự thay đổi và bất ngờ",
                  ],
                },
                color: "purple",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + index * 0.1 }}
                className="mb-4"
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardHeader
                    className={`bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/20 dark:from-${item.color}-900/30 dark:to-${item.color}-800/30 border-b`}
                  >
                    <CardTitle className="flex items-center">
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full bg-${item.color}-500 text-white mr-2`}
                      >
                        {item.title.split(" ")[0].charAt(0)}
                      </span>
                      <span className="mr-2">{item.left.title}</span>
                      <span className="mx-2">vs</span>
                      <span className="mr-2">{item.right.title}</span>
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full bg-${item.color}-500 text-white`}
                      >
                        {item.title.split(" ")[3].charAt(0)}
                      </span>
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div
                        className={`p-4 rounded-lg bg-${item.color}-50 dark:bg-${item.color}-900/20 border border-${item.color}-100 dark:border-${item.color}-800`}
                      >
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{item.left.title}</h4>
                        <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600 dark:text-gray-400">
                          {item.left.points.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      <div
                        className={`p-4 rounded-lg bg-${item.color}-50 dark:bg-${item.color}-900/20 border border-${item.color}-100 dark:border-${item.color}-800`}
                      >
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{item.right.title}</h4>
                        <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600 dark:text-gray-400">
                          {item.right.points.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold mt-8 text-teal-700 dark:text-teal-300">16 Kiểu Tính Cách MBTI</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Từ bốn cặp đặc điểm trên, MBTI xác định 16 kiểu tính cách khác nhau, mỗi kiểu có một bộ đặc điểm, điểm
                mạnh, điểm yếu và sở thích nghề nghiệp riêng. Bài kiểm tra của chúng tôi sẽ giúp bạn xác định kiểu tính
                cách của mình và gợi ý các nghề nghiệp phù hợp nhất.
              </p>

              <h3 className="text-xl font-bold mt-8 text-teal-700 dark:text-teal-300">
                Tại Sao MBTI Quan Trọng Trong Định Hướng Nghề Nghiệp?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">Hiểu rõ kiểu tính cách MBTI của bạn có thể giúp bạn:</p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-700 dark:text-gray-300">
                <li>Xác định môi trường làm việc phù hợp nhất với bạn</li>
                <li>Hiểu rõ điểm mạnh và điểm yếu của bạn trong công việc</li>
                <li>Tìm ra các nghề nghiệp mà bạn có khả năng thành công và hài lòng</li>
                <li>Cải thiện kỹ năng giao tiếp và làm việc nhóm</li>
                <li>Phát triển chiến lược học tập và làm việc hiệu quả</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex justify-center mt-10"
            >
              <Link href="/test">
                <Button
                  size="lg"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Bắt Đầu Kiểm Tra
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <footer className="w-full py-4 px-4 md:px-6 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 dark:border-gray-800">
        <div className="container mx-auto text-center">
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
      </footer>
    </div>
  )
}

