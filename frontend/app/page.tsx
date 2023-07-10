import Image from 'next/image'
import Link from 'next/link'
import { routes } from '../utils/route'

export default function Home() {
  return (
    <><h1>
      Welcome to Homepage
    </h1><Link href={routes.GAME}>
        <h3>Game</h3>
      </Link></>
  )
}
