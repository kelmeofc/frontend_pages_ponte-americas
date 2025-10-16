import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Página não encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <Link href="/">
          <Button size="lg">
            Voltar para a página inicial
          </Button>
        </Link>
      </div>
    </Container>
  );
} 