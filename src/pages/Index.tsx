import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import { Textarea } from '@/components/ui/textarea'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  inStock: boolean
}

interface Expense {
  id: number
  name: string
  amount: number
  category: string
  date: string
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [aiPrompt, setAiPrompt] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

  const products: Product[] = [
    { id: 1, name: 'Ламинат дубовый', category: 'Напольные покрытия', price: 890, image: '🪵', inStock: true },
    { id: 2, name: 'Краска белая матовая', category: 'Краски и лаки', price: 1250, image: '🎨', inStock: true },
    { id: 3, name: 'Светильник потолочный LED', category: 'Освещение', price: 3200, image: '💡', inStock: true },
    { id: 4, name: 'Диван угловой серый', category: 'Мебель', price: 42000, image: '🛋️', inStock: true },
    { id: 5, name: 'Обои виниловые', category: 'Отделка стен', price: 650, image: '📜', inStock: false },
    { id: 6, name: 'Плитка керамическая', category: 'Напольные покрытия', price: 780, image: '⬜', inStock: true }
  ]

  const expenses: Expense[] = [
    { id: 1, name: 'Ламинат', amount: 12500, category: 'Материалы', date: '2025-01-15' },
    { id: 2, name: 'Краска', amount: 3750, category: 'Материалы', date: '2025-01-18' },
    { id: 3, name: 'Работы по укладке', amount: 8000, category: 'Услуги', date: '2025-01-20' },
    { id: 4, name: 'Мебель', amount: 45000, category: 'Мебель', date: '2025-01-22' }
  ]

  const totalBudget = 150000
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const budgetProgress = (totalSpent / totalBudget) * 100

  const categories = [
    { name: 'Напольные покрытия', icon: 'Layers', count: 24 },
    { name: 'Краски и лаки', icon: 'Paintbrush', count: 18 },
    { name: 'Освещение', icon: 'Lightbulb', count: 32 },
    { name: 'Мебель', icon: 'Sofa', count: 45 },
    { name: 'Отделка стен', icon: 'Frame', count: 28 },
    { name: 'Сантехника', icon: 'Droplet', count: 15 }
  ]

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const favoriteProducts = products.filter(p => favorites.includes(p.id))

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-primary text-primary-foreground px-4 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold">Homy</h1>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90">
              <Icon name="Bell" size={20} />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'home' && (
            <div className="p-4 space-y-6 animate-fade-in">
              <div className="space-y-3">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Привет! 👋
                </h2>
                <p className="text-muted-foreground">Найдем всё для вашего идеального дома</p>
              </div>

              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск материалов и мебели..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-card border-2"
                />
              </div>

              <div>
                <h3 className="text-lg font-heading font-semibold mb-3 text-foreground">Категории</h3>
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <Card
                      key={cat.name}
                      className="hover-scale cursor-pointer border-2 hover:border-primary transition-all"
                      onClick={() => setActiveTab('catalog')}
                    >
                      <CardContent className="p-4 text-center space-y-2">
                        <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name={cat.icon as any} size={24} className="text-primary" />
                        </div>
                        <p className="text-xs font-medium text-foreground leading-tight">{cat.name}</p>
                        <Badge variant="secondary" className="text-xs">{cat.count}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm opacity-90">Ваш бюджет</p>
                      <p className="text-2xl font-heading font-bold">{totalSpent.toLocaleString()} ₽</p>
                      <p className="text-xs opacity-75">из {totalBudget.toLocaleString()} ₽</p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setActiveTab('expenses')}
                      className="font-medium"
                    >
                      Подробнее
                    </Button>
                  </div>
                  <Progress value={budgetProgress} className="mt-3 h-2 bg-primary-foreground/20" />
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'catalog' && (
            <div className="p-4 space-y-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setActiveTab('home')}>
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <h2 className="text-2xl font-heading font-bold text-foreground">Каталог</h2>
              </div>

              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                <Badge variant="default" className="cursor-pointer whitespace-nowrap">Все</Badge>
                <Badge variant="outline" className="cursor-pointer whitespace-nowrap">В наличии</Badge>
                <Badge variant="outline" className="cursor-pointer whitespace-nowrap">Скидки</Badge>
                <Badge variant="outline" className="cursor-pointer whitespace-nowrap">Популярное</Badge>
              </div>

              <div className="grid gap-3">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover-scale border-2 hover:border-primary transition-all">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center text-4xl">
                          {product.image}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toggleFavorite(product.id)}
                            >
                              <Icon
                                name="Heart"
                                size={18}
                                className={favorites.includes(product.id) ? 'fill-primary text-primary' : ''}
                              />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <p className="text-xl font-heading font-bold text-primary">
                              {product.price.toLocaleString()} ₽
                            </p>
                            {product.inStock ? (
                              <Badge variant="outline" className="text-xs">В наличии</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">Под заказ</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="p-4 space-y-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setActiveTab('home')}>
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <h2 className="text-2xl font-heading font-bold text-foreground">Расходы</h2>
              </div>

              <Card className="bg-primary text-primary-foreground border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Общий бюджет</CardTitle>
                  <CardDescription className="text-primary-foreground/70">
                    Контроль расходов на ремонт
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-heading font-bold">
                      {totalSpent.toLocaleString()} ₽
                    </span>
                    <span className="text-sm opacity-75">
                      / {totalBudget.toLocaleString()} ₽
                    </span>
                  </div>
                  <Progress value={budgetProgress} className="h-3 bg-primary-foreground/20" />
                  <p className="text-sm opacity-75">
                    Осталось: {(totalBudget - totalSpent).toLocaleString()} ₽
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-heading font-semibold text-foreground">История</h3>
                  <Button variant="outline" size="sm">
                    <Icon name="Plus" size={16} className="mr-1" />
                    Добавить
                  </Button>
                </div>

                {expenses.map((expense) => (
                  <Card key={expense.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-foreground">{expense.name}</h4>
                          <p className="text-sm text-muted-foreground">{expense.category}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(expense.date).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <p className="text-xl font-heading font-bold text-primary">
                          {expense.amount.toLocaleString()} ₽
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="p-4 space-y-4 animate-fade-in">
              <h2 className="text-2xl font-heading font-bold text-foreground">Избранное</h2>

              {favoriteProducts.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-20 h-20 mx-auto bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="Heart" size={40} className="text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Нет избранных товаров</p>
                  <Button onClick={() => setActiveTab('catalog')} variant="outline">
                    Перейти в каталог
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3">
                  {favoriteProducts.map((product) => (
                    <Card key={product.id} className="hover-scale">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center text-4xl">
                            {product.image}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-semibold text-foreground">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">{product.category}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => toggleFavorite(product.id)}
                              >
                                <Icon name="Heart" size={18} className="fill-primary text-primary" />
                              </Button>
                            </div>
                            <p className="text-xl font-heading font-bold text-primary">
                              {product.price.toLocaleString()} ₽
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="p-4 space-y-4 animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-2xl font-heading font-bold text-foreground">AI Визуализация</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <p className="text-sm text-muted-foreground">Работает на основе искусственного интеллекта</p>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 border-2">
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="Sparkles" size={16} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg font-heading">Генератор дизайна</CardTitle>
                  </div>
                  <CardDescription>
                    Опишите интерьер вашей мечты, и искусственный интеллект визуализирует его за секунды
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Icon name="MessageSquare" size={16} className="text-primary" />
                      Ваш запрос
                    </label>
                    <Textarea
                      placeholder="Опишите желаемый интерьер в деталях, например: &#10;&#10;• Современная кухня с белыми шкафами&#10;• Деревянная столешница из светлого дуба&#10;• Зеленые растения и акценты&#10;• Большие окна с естественным светом"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="min-h-[140px] resize-none"
                    />
                    <p className="text-xs text-muted-foreground">Чем подробнее описание, тем лучше результат</p>
                  </div>
                  <Button className="w-full h-12 font-semibold" size="lg" disabled={!aiPrompt.trim()}>
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    Сгенерировать с помощью AI
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <h3 className="text-lg font-heading font-semibold text-foreground">Популярные стили</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Скандинавский', 'Лофт', 'Минимализм', 'Эко-стиль'].map((style) => (
                    <Card key={style} className="hover-scale cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-3 flex items-center justify-center">
                          <Icon name="Image" size={32} className="text-primary" />
                        </div>
                        <p className="font-medium text-foreground">{style}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-heading">История генераций</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="ImageOff" size={40} className="mx-auto mb-3" />
                    <p>Пока нет сгенерированных изображений</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="p-4 space-y-4 animate-fade-in">
              <div className="text-center space-y-3 py-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                  <Icon name="User" size={40} className="text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">Иван Петров</h2>
                  <p className="text-muted-foreground">ivan@example.com</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-heading">Статистика</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Избранных товаров</span>
                    <span className="font-semibold text-foreground">{favorites.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Всего расходов</span>
                    <span className="font-semibold text-foreground">{expenses.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Потрачено</span>
                    <span className="font-semibold text-primary">{totalSpent.toLocaleString()} ₽</span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                {[
                  { icon: 'Settings', label: 'Настройки' },
                  { icon: 'Bell', label: 'Уведомления' },
                  { icon: 'HelpCircle', label: 'Помощь' },
                  { icon: 'FileText', label: 'Условия использования' }
                ].map((item) => (
                  <Card key={item.label} className="hover-scale cursor-pointer">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon name={item.icon as any} size={20} className="text-primary" />
                        <span className="font-medium text-foreground">{item.label}</span>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full" size="lg">
                <Icon name="LogOut" size={20} className="mr-2" />
                Выйти
              </Button>
            </div>
          )}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
          <div className="mx-auto max-w-md">
            <div className="flex items-center justify-around py-2">
              {[
                { id: 'home', icon: 'Home', label: 'Главная' },
                { id: 'catalog', icon: 'Search', label: 'Каталог' },
                { id: 'ai', icon: 'Sparkles', label: 'AI' },
                { id: 'favorites', icon: 'Heart', label: 'Избранное' },
                { id: 'profile', icon: 'User', label: 'Профиль' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab.icon as any} size={22} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Index