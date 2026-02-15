export const Footer = () => {
    return (
        <footer className="mt-8 flex items-center justify-between text-slate-400 dark:text-slate-500 text-xs">
            <p>© 2024 HR Enterprise Solutions. Todos los derechos reservados.</p>
            <div className="flex gap-4">
                <a className="hover:text-primary" href="#">Política de Privacidad</a>
                <a className="hover:text-primary" href="#">Soporte Técnico</a>
            </div>
        </footer>
    )
}
