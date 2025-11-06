"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

interface Question {
  id: number
  type: string
  question: string
  options: string[]
  category: string
  hint?: string
}

const questions: Question[] = [
  {
    id: 1,
    type: "Вопрос",
    question: "Какое заклинание используется для вызова Патронуса?",
    options: ["Экспекто Патронум", "Экспеллиармус", "Ступефай", "Протего"],
    category: "Заклинания",
  },
  {
    id: 2,
    type: "Загадка",
    question: "Я охраняю вход, но не дверь. Я требую пароль, но не замок. Я висю на стене и говорю. Кто я?",
    options: ["Дверь в спальню", "Толстая Дама", "Распределяющая Шляпа", "Призрак"],
    category: "Загадки",
    hint: "Охраняет вход в Гриффиндор",
  },
  {
    id: 3,
    type: "Анаграмма",
    question: "Разгадайте анаграмму имени персонажа: МОТВОЛАНДЕР",
    options: ["Альбус Дамблдор", "Том Реддл", "Волан-де-Морт", "Драко Малфой"],
    category: "Анаграммы",
  },
  {
    id: 5,
    type: "Шифр",
    question: "Расшифруйте заклинание (каждая буква сдвинута на 1 вперед): МЯНПТ",
    options: ["Люмос", "Нокс", "Акцио", "Репаро"],
    category: "Шифры",
    hint: "Заклинание света",
  },
  {
    id: 6,
    type: "Математика",
    question: "Сколько всего крестражей создал Волан-де-Морт?",
    options: ["6", "7", "5", "8"],
    category: "Математика",
  },
  {
    id: 7,
    type: "Загадка",
    question: "Я могу быть оленем, выдрой или кошкой. Я защищаю от тьмы. Я - воплощение счастья. Что я?",
    options: ["Анимаг", "Патронус", "Богарт", "Фестрал"],
    category: "Загадки",
  },
  {
    id: 8,
    type: "Ребус",
    question: "Факультет: ХРАБРОСТЬ + ЛЕВ + КРАСНЫЙ + ЗОЛОТОЙ = ?",
    options: ["Слизерин", "Когтевран", "Гриффиндор", "Пуффендуй"],
    category: "Ребусы",
  },
  {
    id: 10,
    type: "Вопрос",
    question: "Как зовут сову Гарри Поттера?",
    options: ["Хедвиг", "Букля", "Пигвиджен", "Эррол"],
    category: "Персонажи",
  },
  {
    id: 12,
    type: "Цитата",
    question: "Кто сказал: 'Счастье можно найти даже в самые темные времена, если не забывать обращаться к свету'?",
    options: ["Северус Снейп", "Минерва МакГонагалл", "Альбус Дамблдор", "Ремус Люпин"],
    category: "Цитаты",
  },
  {
    id: 15,
    type: "Ребус",
    question: "Место: ВОЛШЕБНИКИ + ТЮРЬМА + ДЕМЕНТОРЫ + ОСТРОВ = ?",
    options: ["Хогвартс", "Азкабан", "Министерство", "Годрикова впадина"],
    category: "Ребусы",
  },
  {
    id: 17,
    type: "Загадка",
    question: "Меня видят только те, кто видел смерть. Я тяну повозки, но кажусь невидимым. Кто я?",
    options: ["Гиппогриф", "Единорог", "Кентавр", "Фестрал"],
    category: "Загадки",
  },
  {
    id: 20,
    type: "Математика",
    question: "Сколько детей в семье Уизли?",
    options: ["6", "5", "7", "8"],
    category: "Математика",
  },
  {
    id: 22,
    type: "Ребус",
    question: "Персонаж: ДОМОВОЙ + ЭЛЬФ + НОСОК + СВОБОДА = ?",
    options: ["Кричер", "Винки", "Хоки", "Добби"],
    category: "Ребусы",
  },
  {
    id: 24,
    type: "Цитата",
    question: "Кто сказал легендарное слово: 'Всегда'?",
    options: ["Лили Поттер", "Северус Снейп", "Гарри Поттер", "Альбус Дамблдор"],
    category: "Цитаты",
  },
  {
    id: 26,
    type: "Вопрос",
    question: "Какой дракон достался Гарри в Турнире Трёх Волшебников?",
    options: ["Китайский Огнешар", "Шведский Тупорыл", "Венгерская Хвосторога", "Уэльский Зелёный"],
    category: "Существа",
  },
  {
    id: 29,
    type: "Математика",
    question: "Сколько школ участвовало в Турнире Трёх Волшебников?",
    options: ["4", "5", "3", "2"],
    category: "Математика",
  },
  {
    id: 31,
    type: "Вопрос",
    question: "Как называется паб в деревне Хогсмид, куда часто ходят студенты?",
    options: ["Кабанья голова", "Три метлы", "Дырявый котёл", "Золотой грифон"],
    category: "Места",
  },
  {
    id: 33,
    type: "Загадка",
    question: "Я - красный камень, дарующий бессмертие. Меня создал Николас Фламель. Что я?",
    options: ["Воскрешающий камень", "Рубин", "Философский камень", "Крестраж"],
    category: "Загадки",
  },
  {
    id: 36,
    type: "Вопрос",
    question: "Чем Гарри уничтожил дневник Тома Реддла?",
    options: ["Меч Гриффиндора", "Клык Василиска", "Огонь", "Заклинание"],
    category: "Крестражи",
  },
  {
    id: 44,
    type: "Загадка",
    question: "Я - самая быстрая метла своего времени. Сириус подарил меня Гарри. Моё имя связано с погодой. Что я?",
    options: ["Нимбус 2000", "Комета", "Молния", "Чистомёт"],
    category: "Загадки",
  },
]

export default function HarryPotterQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [showSettings, setShowSettings] = useState(true)
  const [timeLimit, setTimeLimit] = useState<number | null>(60)
  const [autoAdvance, setAutoAdvance] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [customTime, setCustomTime] = useState("60")

  useEffect(() => {
    if (!quizStarted || timeLimit === null) return

    setTimeLeft(timeLimit)

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) {
          if (autoAdvance && currentQuestion < questions.length - 1) {
            setCurrentQuestion((q) => q + 1)
            return timeLimit
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [quizStarted, currentQuestion, timeLimit, autoAdvance])

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      if (timeLimit !== null) {
        setTimeLeft(timeLimit)
      }
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      if (timeLimit !== null) {
        setTimeLeft(timeLimit)
      }
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setQuizStarted(false)
    setShowSettings(true)
    setTimeLeft(null)
  }

  if (!quizStarted || showSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-2 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="flex justify-center mb-4">
              <div className="text-6xl">⚡</div>
            </div>
            <CardTitle className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Магический Квиз по Гарри Поттеру
            </CardTitle>
            <CardDescription className="text-lg text-pretty">
              50 заданий для командной игры! Загадки, ребусы, анаграммы и головоломки о волшебном мире.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl mb-2">🧩</div>
                <div className="text-sm font-medium text-muted-foreground">Загадки</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl mb-2">🔤</div>
                <div className="text-sm font-medium text-muted-foreground">Анаграммы</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl mb-2">🔐</div>
                <div className="text-sm font-medium text-muted-foreground">Шифры</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-sm font-medium text-muted-foreground">Ребусы</div>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Время на вопрос (в секундах)</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min="1"
                    max="600"
                    value={customTime}
                    onChange={(e) => {
                      const value = e.target.value
                      setCustomTime(value)
                      const numValue = Number.parseInt(value)
                      if (!isNaN(numValue) && numValue > 0) {
                        setTimeLimit(numValue)
                      }
                    }}
                    className="flex-1 h-12 text-lg"
                    placeholder="Введите время в секундах"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTimeLimit(null)
                      setCustomTime("")
                    }}
                    className="h-12"
                  >
                    Без ограничения
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {timeLimit !== null
                    ? `Установлено: ${Math.floor(timeLimit / 60)}:${(timeLimit % 60).toString().padStart(2, "0")} минут`
                    : "Время не ограничено"}
                </p>
              </div>

              {timeLimit !== null && (
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="auto-advance"
                    checked={autoAdvance}
                    onCheckedChange={(checked) => setAutoAdvance(checked as boolean)}
                  />
                  <Label htmlFor="auto-advance" className="cursor-pointer">
                    Автоматически переключать на следующий вопрос
                  </Label>
                </div>
              )}
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm text-muted-foreground text-center">
                Формат для команд: ведущий показывает вопросы на экране, команды обсуждают и записывают ответы
              </p>
            </div>
            <Button
              onClick={() => {
                setQuizStarted(true)
                setShowSettings(false)
                if (timeLimit !== null) {
                  setTimeLeft(timeLimit)
                }
              }}
              size="lg"
              className="w-full text-lg h-14 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Начать квиз ⚡
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const timeProgress = timeLimit !== null && timeLeft !== null ? (timeLeft / timeLimit) * 100 : 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl border-2 shadow-2xl">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm px-3 py-1 bg-accent text-accent-foreground">
              {question.type}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {question.category}
            </Badge>
            {timeLeft !== null && (
              <Badge
                variant={timeLeft <= 10 ? "destructive" : "default"}
                className="text-2xl px-6 py-3 font-mono font-bold"
              >
                ⏱️ {formatTime(timeLeft)}
              </Badge>
            )}
            <div className="text-sm font-medium text-muted-foreground">
              Задание {currentQuestion + 1} из {questions.length}
            </div>
          </div>

          {timeLeft !== null && (
            <div className="space-y-2">
              <Progress
                value={timeProgress}
                className={`h-3 transition-all ${timeLeft <= 10 ? "bg-destructive/20" : ""}`}
              />
              <p className="text-xs text-center text-muted-foreground">Осталось времени: {formatTime(timeLeft)}</p>
            </div>
          )}

          <Progress value={progress} className="h-2" />

          <CardTitle className="text-2xl md:text-4xl font-bold text-balance leading-relaxed pt-4">
            {question.question}
          </CardTitle>

          {question.hint && (
            <div className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-lg">
              💡 Подсказка: {question.hint}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className="p-4 bg-muted/50 rounded-lg border-2 border-muted hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="text-base font-medium">{option}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
              size="lg"
              className="flex-1 h-12 text-lg bg-transparent"
            >
              ← Предыдущее
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
              size="lg"
              className="flex-1 h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Следующее →
            </Button>
          </div>

          <div className="flex items-center justify-center pt-2">
            <Button onClick={handleRestart} variant="ghost" size="sm" className="text-muted-foreground">
              Начать заново
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
