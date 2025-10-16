import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex items-center pt-5 bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <p className="text-sm text-gray-600 mb-2 md:mb-0">
                        © 2025 PPPI - Todos os direitos reservados.
                    </p>
                    <p className="text-center text-sm text-gray-600 mb-2 md:mb-0">
                        Este site não é vinculado ao Facebook, Instagram ou Meta Inc.
                    </p>
                    <div className="flex space-x-4">
                        <Link href="/termos-de-uso" className="text-sm text-gray-600 hover:text-primary">
                            Termos de Uso
                        </Link>
                        <Link href="/politica-de-privacidade" className="text-sm text-gray-600 hover:text-primary">
                            Política de Privacidade
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}