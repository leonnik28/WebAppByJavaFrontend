import './css/globals.css'
import './css/footer.css'
import './css/header.css'


export default function PagesLayout({
  children,
}) {
  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'> {}
      <nav className='pt-16'>
        {}
      </nav>
      <main className=''> {}
        {children}
      </main>
      <Footer />
    </div>
  )
}

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <ul className="social-icon">
        <li className="social-icon__item"><a className="social-icon__link" href="">
        </a></li>
        <li className="social-icon__item"><a className="social-icon__link" href="#">
          
        </a></li>
        <li className="social-icon__item"><a className="social-icon__link" href="#">
          <ion-icon name="logo-linkedin"></ion-icon>
        </a></li>
        <li className="social-icon__item"><a className="social-icon__link" href="#">
          <ion-icon name="logo-instagram"></ion-icon>
        </a></li>
      </ul>
    </footer>
  )
}
