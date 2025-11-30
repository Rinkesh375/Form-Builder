"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { FormSchema } from "@/types/schema-type";

export default function SchemaView({ title, nameSchema, fields }: FormSchema) {
  return (
    <Card className="max-w-4xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Schema Name: {nameSchema}
        </p>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Required</TableHead>
              <TableHead>Validations</TableHead>
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fields.map((field) => (
              <TableRow key={field.name}>
                <TableCell>{field.name}</TableCell>
                <TableCell>{field.type}</TableCell>
                <TableCell>{field.label}</TableCell>

                <TableCell>
                  {field.required ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </TableCell>

                <TableCell>
                  {field.validations ? (
                    <pre className="text-xs whitespace-pre-wrap">
                      {JSON.stringify(field.validations, null, 2)}
                    </pre>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell>
                  {field.options ? (
                    <pre className="text-xs whitespace-pre-wrap">
                      {JSON.stringify(field.options, null, 2)}
                    </pre>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
