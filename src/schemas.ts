import { never, number, z } from "zod";

export const zPosition = z.array(z.number()).length(2);
export const zPosition3D = z.array(z.number()).length(3);

// Features With 2D Positions
//--------------------------------------------------------------------

const zPoint2D = z
  .object({
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.2
    type: z.literal("Point"),
    coordinates: zPosition,
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zMultiPoint2D = z
  .object({
    type: z.literal("MultiPoint"),
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.3
    coordinates: z.array(zPosition),
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zLineString2D = z
  .object({
    type: z.literal("LineString"),
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.4
    coordinates: z.array(zPosition).min(2),
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zMultiLineString2D = z
  .object({
    type: z.literal("MultiLineString"),
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.5
    coordinates: z.array(z.array(zPosition).min(2)),
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zPolygon2D = z
  .object({
    type: z.literal("Polygon"),
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6
    coordinates: z.array(
      z
        .array(zPosition)
        .min(4)
        .refine((obj) => {
          const start = obj[0];
          const end = obj[obj.length - 1];
          return start[0] === end[0] && start[1] === end[1];
        })
    ),
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zMultiPolygon2D = z
  .object({
    type: z.literal("MultiPolygon"),
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.7
    coordinates: z.array(
      z.array(
        z
          .array(zPosition)
          .min(4)
          .refine((obj) => {
            const start = obj[0];
            const end = obj[obj.length - 1];
            return start[0] === end[0] && start[1] === end[1];
          })
      )
    ),
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zGeometryCollection2D = z.object({
  type: z.literal("GeometryCollection"),
  // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.8
  geometries: z.union([
    zPoint2D,
    zMultiPoint2D,
    zLineString2D,
    zMultiLineString2D,
    zPolygon2D,
    zMultiPolygon2D,
  ]),
});

// Features With 3D Positions
//--------------------------------------------------------------------

const zPoint3D = z
  .object({
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.2
    type: z.literal("Point"),
    coordinates: zPosition3D,
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zMultiPoint3D = z
  .object({
    type: z.literal("MultiPoint"),
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.3
    coordinates: z.array(zPosition3D),
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zLineString3D = z
  .object({
    type: z.literal("LineString"),
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.4
    coordinates: z.array(zPosition3D).min(2),
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zMultiLineString3D = z
  .object({
    type: z.literal("MultiLineString"),
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.5
    coordinates: z.array(z.array(zPosition3D).min(2)),
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zPolygon3D = z
  .object({
    type: z.literal("Polygon"),
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6
    coordinates: z.array(
      z
        .array(zPosition3D)
        .min(4)
        .refine((obj) => {
          const start = obj[0];
          const end = obj[obj.length - 1];
          return start[0] === end[0] && start[1] === end[1];
        })
    ),
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zMultiPolygon3D = z
  .object({
    type: z.literal("MultiPolygon"),
    // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.7
    coordinates: z.array(
      z
        .array(zPosition3D)
        .min(4)
        .refine((obj) => {
          const start = obj[0];
          const end = obj[obj.length - 1];
          return start[0] === end[0] && start[1] === end[1];
        })
    ),
  })
  .refine((obj: any) => {
    return obj["properties"] === undefined;
  });

const zGeometryCollection3D = z.object({
  type: z.literal("GeometryCollection"),
  // https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.8
  geometries: z.union([
    zPoint2D,
    zMultiPoint2D,
    zLineString2D,
    zMultiLineString2D,
    zPolygon2D,
    zMultiPolygon2D,
  ]),
});

//--------------------------------------------------------------------

const feature2D = z
  .object({
    type: z.literal("Feature"),
    id: z.union([z.string(), z.number()]).optional(),
    bbox: z.array(z.number()).length(4).optional(),
    geometry: z
      .union([
        zPoint2D,
        zMultiPoint2D,
        zLineString2D,
        zMultiLineString2D,
        zPolygon2D,
        zMultiPolygon2D,
        zGeometryCollection2D,
      ])
      .nullable(),
    properties: z.object({}).nullable(),
  })
  .refine((obj: any) => {
    return obj["geometries"] === undefined;
  });

const feature3D = z
  .object({
    type: z.literal("Feature"),
    id: z.union([z.string(), z.number()]).optional(),
    bbox: z.array(z.number()).length(6).optional(),
    geometry: z
      .union([
        zPoint3D,
        zMultiPoint3D,
        zLineString3D,
        zMultiLineString3D,
        zPolygon3D,
        zMultiPolygon3D,
        zGeometryCollection3D,
      ])
      .nullable(),
    properties: z.object({}).nullable(),
  })
  .refine((obj: any) => {
    return obj["geometries"] === undefined;
  });

// https://datatracker.ietf.org/doc/html/rfc7946#section-3.2
export const zFeature = z.union([feature2D, feature3D]);

const featureCollection2D = z
  .object({
    type: z.literal("FeatureCollection"),
    bbox: z.array(z.number()).length(4).optional(),
    features: z.array(feature2D),
    coordinates: z.never(),
  })
  .refine((obj: any) => {
    return obj["coordinates"] === undefined && obj["geometry"] === undefined;
  });

const featureCollection3D = z
  .object({
    type: z.literal("FeatureCollection"),
    bbox: z.array(z.number()).length(6).optional(),
    features: z.array(feature3D),
  })
  .refine((obj: any) => {
    return obj["coordinates"] === undefined && obj["geometry"] === undefined;
  });

export const zFeatureCollection = z.union([
  featureCollection2D,
  featureCollection3D,
]);
