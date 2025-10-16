"use client"

import { CheckCircle2, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Processo de Registro</TableHead>
            <TableHead className="text-center">Sem Análise Prévia</TableHead>
            <TableHead className="text-center bg-primary/5">Com Análise PPPI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Taxa de aprovação na primeira tentativa</TableCell>
            <TableCell className="text-center">30%</TableCell>
            <TableCell className="text-center bg-primary/5 font-medium">92%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Tempo médio até aprovação</TableCell>
            <TableCell className="text-center">24-36 meses</TableCell>
            <TableCell className="text-center bg-primary/5 font-medium">12-18 meses</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Custo total (incluindo retrabalho)</TableCell>
            <TableCell className="text-center">R$ 5.000 - R$ 12.000</TableCell>
            <TableCell className="text-center bg-primary/5 font-medium">R$ 899 a R$ 2997</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Identificação prévia de conflitos</TableCell>
            <TableCell className="text-center">
              <XCircle className="h-5 w-5 text-red-500 mx-auto" />
            </TableCell>
            <TableCell className="text-center bg-primary/5">
              <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Verificação de documentação</TableCell>
            <TableCell className="text-center">
              <XCircle className="h-5 w-5 text-red-500 mx-auto" />
            </TableCell>
            <TableCell className="text-center bg-primary/5">
              <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Estratégia de classificação otimizada</TableCell>
            <TableCell className="text-center">
              <XCircle className="h-5 w-5 text-red-500 mx-auto" />
            </TableCell>
            <TableCell className="text-center bg-primary/5">
              <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Recomendações personalizadas</TableCell>
            <TableCell className="text-center">
              <XCircle className="h-5 w-5 text-red-500 mx-auto" />
            </TableCell>
            <TableCell className="text-center bg-primary/5">
              <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

