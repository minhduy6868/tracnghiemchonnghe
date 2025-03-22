"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"

// Định nghĩa các câu hỏi cho bài kiểm tra tính cách MBTI
const questions = [
  // E vs I - Hướng ngoại vs Hướng nội
  {
    id: 1,
    category: "EI",
    question: "Khi ở trong một nhóm đông người, bạn thường:",
    options: [
      { value: "E", label: "Cảm thấy năng lượng tăng lên và thích tham gia vào các cuộc trò chuyện" },
      { value: "I", label: "Cảm thấy mất năng lượng và thích quan sát hơn là tham gia" },
    ],
  },
  {
    id: 2,
    category: "EI",
    question: "Sau một ngày làm việc hoặc học tập căng thẳng, bạn thích:",
    options: [
      { value: "E", label: "Gặp gỡ bạn bè hoặc tham gia hoạt động xã hội để thư giãn" },
      { value: "I", label: "Dành thời gian một mình hoặc với một vài người thân thiết để nạp lại năng lượng" },
    ],
  },
  {
    id: 3,
    category: "EI",
    question: "Khi làm việc trên một dự án, bạn thích:",
    options: [
      { value: "E", label: "Làm việc trong một nhóm, trao đổi ý tưởng và phản hồi thường xuyên" },
      { value: "I", label: "Làm việc độc lập, suy nghĩ kỹ lưỡng trước khi chia sẻ ý tưởng" },
    ],
  },

  // S vs N - Thực tế vs Trực quan
  {
    id: 4,
    category: "SN",
    question: "Khi học một điều mới, bạn thường:",
    options: [
      { value: "S", label: "Thích các hướng dẫn cụ thể, từng bước và ví dụ thực tế" },
      { value: "N", label: "Thích hiểu bức tranh tổng thể và các khái niệm trước, sau đó mới đi vào chi tiết" },
    ],
  },
  {
    id: 5,
    category: "SN",
    question: "Khi đọc một cuốn sách hoặc xem một bộ phim, bạn thường:",
    options: [
      { value: "S", label: "Chú ý đến các chi tiết cụ thể và sự kiện trong câu chuyện" },
      { value: "N", label: "Tìm kiếm ý nghĩa ẩn dụ, chủ đề và kết nối với các ý tưởng khác" },
    ],
  },
  {
    id: 6,
    category: "SN",
    question: "Khi giải quyết vấn đề, bạn thường:",
    options: [
      { value: "S", label: "Dựa vào kinh nghiệm quá khứ và các phương pháp đã được chứng minh" },
      { value: "N", label: "Thử nghiệm các cách tiếp cận mới và tìm kiếm các giải pháp sáng tạo" },
    ],
  },

  // T vs F - Lý trí vs Cảm tính
  {
    id: 7,
    category: "TF",
    question: "Khi đưa ra quyết định quan trọng, bạn thường dựa vào:",
    options: [
      { value: "T", label: "Logic, phân tích và cân nhắc khách quan về lợi ích và hậu quả" },
      { value: "F", label: "Giá trị cá nhân, cảm xúc và tác động đến mọi người liên quan" },
    ],
  },
  {
    id: 8,
    category: "TF",
    question: "Khi một người bạn chia sẻ vấn đề với bạn, bạn thường:",
    options: [
      { value: "T", label: "Đưa ra lời khuyên thực tế và giải pháp để giải quyết vấn đề" },
      { value: "F", label: "Lắng nghe, thể hiện sự đồng cảm và hỗ trợ tinh thần" },
    ],
  },
  {
    id: 9,
    category: "TF",
    question: "Trong một cuộc tranh luận, bạn thường:",
    options: [
      { value: "T", label: "Tập trung vào các sự kiện, logic và tìm kiếm sự thật khách quan" },
      { value: "F", label: "Cân nhắc cảm xúc của mọi người và tìm kiếm sự đồng thuận" },
    ],
  },

  // J vs P - Nguyên tắc vs Linh hoạt
  {
    id: 10,
    category: "JP",
    question: "Khi lập kế hoạch cho một chuyến đi, bạn thích:",
    options: [
      { value: "J", label: "Có lịch trình chi tiết, đặt trước mọi thứ và biết chính xác bạn sẽ làm gì" },
      { value: "P", label: "Giữ các tùy chọn mở, quyết định theo tình huống và thích ứng với cơ hội mới" },
    ],
  },
  {
    id: 11,
    category: "JP",
    question: "Không gian làm việc hoặc học tập của bạn thường:",
    options: [
      { value: "J", label: "Ngăn nắp, có tổ chức với mọi thứ ở đúng vị trí" },
      { value: "P", label: "Hơi lộn xộn nhưng bạn biết mọi thứ ở đâu khi cần" },
    ],
  },
  {
    id: 12,
    category: "JP",
    question: "Khi phải hoàn thành một nhiệm vụ, bạn thường:",
    options: [
      { value: "J", label: "Bắt đầu sớm, làm việc theo kế hoạch và hoàn thành trước hạn" },
      { value: "P", label: "Đợi đến gần deadline để có động lực và cảm hứng tốt nhất" },
    ],
  },

  // Câu hỏi bổ sung cho E vs I
  {
    id: 13,
    category: "EI",
    question: "Trong các cuộc họp hoặc lớp học, bạn thường:",
    options: [
      { value: "E", label: "Tích cực phát biểu, đặt câu hỏi và tham gia thảo luận" },
      { value: "I", label: "Lắng nghe, ghi chép và suy nghĩ kỹ trước khi phát biểu" },
    ],
  },

  // Câu hỏi bổ sung cho S vs N
  {
    id: 14,
    category: "SN",
    question: "Bạn thường được mô tả là người:",
    options: [
      { value: "S", label: "Thực tế, chân đất và tập trung vào hiện tại" },
      { value: "N", label: "Giàu trí tưởng tượng, sáng tạo và hướng về tương lai" },
    ],
  },

  // Câu hỏi bổ sung cho T vs F
  {
    id: 15,
    category: "TF",
    question: "Khi nhận phản hồi tiêu cực, bạn thường:",
    options: [
      { value: "T", label: "Xem xét khách quan, tách biệt cảm xúc và tìm cách cải thiện" },
      { value: "F", label: "Cảm thấy tổn thương cá nhân và cần thời gian để xử lý cảm xúc" },
    ],
  },

  // Câu hỏi bổ sung cho J vs P
  {
    id: 16,
    category: "JP",
    question: "Bạn thích làm việc trong môi trường:",
    options: [
      { value: "J", label: "Có cấu trúc rõ ràng, quy trình và thời hạn cụ thể" },
      { value: "P", label: "Linh hoạt, thích ứng và cho phép sáng tạo tự do" },
    ],
  },
]

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [isLoaded, setIsLoaded] = useState(false)
  const [direction, setDirection] = useState(0) // 1 for forward, -1 for backward

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleNext = () => {
    if (selectedOption) {
      // Lưu câu trả lời hiện tại
      setAnswers({ ...answers, [currentQuestion]: selectedOption })
      setDirection(1)

      // Chuyển sang câu hỏi tiếp theo hoặc kết quả
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(answers[currentQuestion + 1] || null)
      } else {
        // Tính toán kết quả và chuyển hướng
        const result = calculateMBTIResult(answers)
        router.push(`/results?type=${result}`)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1)
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[currentQuestion - 1] || null)
    }
  }

  const calculateMBTIResult = (answers: Record<number, string>) => {
    // Đếm số lượng câu trả lời cho mỗi loại
    let E = 0,
      I = 0,
      S = 0,
      N = 0,
      T = 0,
      F = 0,
      J = 0,
      P = 0

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      if (!question) return

      switch (answer) {
        case "E":
          E++
          break
        case "I":
          I++
          break
        case "S":
          S++
          break
        case "N":
          N++
          break
        case "T":
          T++
          break
        case "F":
          F++
          break
        case "J":
          J++
          break
        case "P":
          P++
          break
      }
    })

    // Xác định loại tính cách dựa trên số lượng câu trả lời
    const type = [E > I ? "E" : "I", S > N ? "S" : "N", T > F ? "T" : "F", J > P ? "J" : "P"].join("")

    return type
  }

  const filteredQuestions = activeTab === "all" ? questions : questions.filter((q) => q.category === activeTab)

  const displayedQuestion =
    activeTab === "all" ? questions[currentQuestion] : filteredQuestions[currentQuestion % filteredQuestions.length]

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const categoryColors = {
    EI: "from-blue-500 to-blue-600",
    SN: "from-green-500 to-green-600",
    TF: "from-red-500 to-red-600",
    JP: "from-purple-500 to-purple-600",
  }

  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || "from-teal-500 to-blue-500"
  }

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
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl"
        >
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
            <CardHeader className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 dark:from-teal-500/10 dark:to-blue-500/10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-6 w-6 text-teal-500" />
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">
                    Đánh Giá Tính Cách MBTI
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Câu hỏi {currentQuestion + 1} trong số {questions.length}
                </CardDescription>
                <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${getCategoryColor(displayedQuestion.category)}`}
                    initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid grid-cols-5 p-1 bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Tất cả
                  </TabsTrigger>
                  <TabsTrigger
                    value="EI"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                  >
                    E/I
                  </TabsTrigger>
                  <TabsTrigger
                    value="SN"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
                  >
                    S/N
                  </TabsTrigger>
                  <TabsTrigger
                    value="TF"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
                  >
                    T/F
                  </TabsTrigger>
                  <TabsTrigger
                    value="JP"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                  >
                    J/P
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="p-4 rounded-lg bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-teal-100 dark:border-gray-700">
                    <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                      {displayedQuestion.question}
                    </h2>
                  </div>
                  <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-4">
                    {displayedQuestion.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div
                          className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-all duration-200 ${
                            selectedOption === option.value
                              ? "border-teal-500 bg-teal-50 dark:border-teal-400 dark:bg-teal-900/30"
                              : "hover:border-teal-200 hover:bg-teal-50/50 dark:hover:border-teal-800 dark:hover:bg-teal-900/10"
                          }`}
                          onClick={() => setSelectedOption(option.value)}
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`option-${index}`}
                            className="text-teal-500 dark:text-teal-400"
                          />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </motion.div>
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-teal-500 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900/30 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Trước
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedOption}
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-300"
              >
                {currentQuestion < questions.length - 1 ? "Tiếp theo" : "Xem Kết Quả"}
                {currentQuestion < questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
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

