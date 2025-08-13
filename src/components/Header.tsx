import { Sparkles, Moon, Sun } from 'lucide-react'

interface HeaderProps {
  darkMode: boolean
  onToggleTheme: () => void
}

export default function Header({ darkMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">
          <Sparkles className="title-icon" />
          Generador de Imágenes AI
        </h1>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Cambiar tema"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  )
}
