import style from './home_layout.module.css'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={style.Main}>
      {children}
    </main>
  )
}
