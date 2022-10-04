import Link from 'next/link'
import { Span } from 'components'

type Props = {
    href: string,
    text: string
}

export const NavLink = ({ href, text }: Props) => {
    return <div>
        <Link href={href}><a><Span className='mx-4'>{text}</Span></a></Link>
    </div>
}