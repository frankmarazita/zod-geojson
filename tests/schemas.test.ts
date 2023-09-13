import { zFeature, zFeatureCollection } from "../src/schemas";

test("Validating a geojson feature", () => {
  const object = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [125.6, 10.1],
    },
    properties: {
      name: "Dinagat Islands",
    },
  };

  const res = zFeature.safeParse(object);
  if (res.success === false) throw res.error;
});

test("Validating a geojson feature collection", () => {
  const object = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [102.0, 0.5],
        },
        properties: {
          prop0: "value0",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [102.0, 0.0],
            [103.0, 1.0],
            [104.0, 0.0],
            [105.0, 1.0],
          ],
        },
        properties: {
          prop0: "value0",
          prop1: 0.0,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0],
            ],
          ],
        },
        properties: {
          prop0: "value0",
          prop1: {
            this: "that",
          },
        },
      },
    ],
  };

  const res = zFeatureCollection.safeParse(object);
  if (res.success === false) throw res.error;
});

test("Validating a geojson feature bbox", () => {
  const object = {
    type: "Feature",
    bbox: [-10.0, -10.0, 10.0, 10.0],
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-10.0, -10.0],
          [10.0, -10.0],
          [10.0, 10.0],
          [-10.0, -10.0],
        ],
      ],
    },
    properties: null,
  };

  const res = zFeature.safeParse(object);
  if (res.success === false) throw res.error;
});

test("Validating a geojson feature collection bbox", () => {
  const object = {
    type: "FeatureCollection",
    bbox: [100.0, 0.0, 105.0, 1.0],
    features: [],
  };

  const res = zFeatureCollection.safeParse(object);
  if (res.success === false) throw res.error;
});

test("Validating a geojson feature with foreign members", () => {
  const object = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-10.0, -10.0],
          [10.0, -10.0],
          [10.0, 10.0],
          [-10.0, -10.0],
        ],
      ],
    },
    properties: null,
    id: "f1",
    title: "Example Feature",
  };

  const res = zFeature.safeParse(object);
  if (res.success === false) throw res.error;
});

test("", () => {
  const object = {
    type: "Feature",
    id: "f2",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-10.0, -10.0],
          [10.0, -10.0],
          [10.0, 10.0],
          [-10.0, -10.0],
        ],
      ],
    },
    properties: {},
    centerline: {
      type: "LineString",
      coordinates: [
        [-170, 10],
        [170, 11],
      ],
    },
  };

  const res = zFeature.safeParse(object);
  if (res.success === false) throw res.error;
});
