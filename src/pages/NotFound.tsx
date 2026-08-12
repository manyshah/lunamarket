import { Link } from 'react-router-dom'
export function NotFound() { return <div className="container inner-page empty-state not-found"><span>404</span><h1>این صفحه بین قفسه‌های لونا گم شده.</h1><p>آدرس را بررسی کن یا به صفحه اصلی برگرد.</p><Link className="button button--dark" to="/">بازگشت به خانه</Link></div> }
