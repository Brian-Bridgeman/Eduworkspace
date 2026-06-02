# NSwag Guide

## Generera API-klient
Kör följande kommando i `/Client/`:
```bash
npm run gen-api
```

## Användning av klient

Importera `Client` i komponenten där du vill använda den:
```typescript
import { Client } from '../../services/api-client.service';
```

Injekta sedan via konstruktorn:
```typescript
constructor(private client: Client) {}
```

Exempel på anrop:
```typescript
// Hämta lista
this.client.getApiCourses().subscribe(courses => {
  this.courses = courses;
});

// Skapa
this.client.postApiCourses(dto).subscribe(() => { ... });

// Ta bort
this.client.deleteApiCourses(id).subscribe(() => { ... });
```

## Endpoint-struktur

Se `/Server/Routes/ExampleEndpoints.cs` för ett fullständigt exempel.

Kort sammanfattning — varje endpoint **måste** ha `.Produces<T>()`, annars genereras fel dto returtyp i klienten:
```csharp
app.MapGet("api/examples", () => Results.Ok(list))
   .Produces<List>(StatusCodes.Status200OK); # DEnna rad är det som generar DTOn för klienten

app.MapPost("api/examples", (CreateExampleDto dto) => Results.Created(...))
   .Produces(StatusCodes.Status201Created);

app.MapPut("api/examples/{id:int}", (int id, UpdateExampleDto dto) => Results.NoContent())
   .Produces(StatusCodes.Status204NoContent)
   .Produces(StatusCodes.Status404NotFound);

app.MapDelete("api/examples/{id:int}", (int id) => Results.NoContent())
   .Produces(StatusCodes.Status204NoContent)
   .Produces(StatusCodes.Status404NotFound);
```
