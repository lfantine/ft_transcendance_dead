import style from './login_layout.module.css'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={style.Main}>
      <div style={{height: '10px', width: '100%'}}></div> {/* cette ligne est fait pour cancel le probleme de top margin*/}
      <h1 className={style.title}>login</h1>
      {children}
    </main>
  )
}
