import Link from 'next/link'
import { useRouter } from 'next/router'
import { Span } from 'components'

type Props = {
    href: string,
    text: string
}

export const NavLink = ({ href, text }: Props) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return <div>
        <Link href={href}><a><Span className={`mx-4 ${isActive && "font-semibold"}`}>{text}</Span></a></Link>
    </div>
}