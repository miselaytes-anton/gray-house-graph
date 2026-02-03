export interface CharacterNode {
  id: string;
  mainNickname: string;
  alternativeNicknames: string[];
  persona: string;
  group: string;
  // d3-force specific properties (optional, added by library)
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  index?: number;
}

export interface RelationshipLink {
  source: string | CharacterNode; // ID or object after parsing
  target: string | CharacterNode;
  type: string;
}

export interface GraphData {
  nodes: CharacterNode[];
  links: RelationshipLink[];
}
