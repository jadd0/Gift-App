type FixedLengthString<N extends number> = `${string & { length: N }}`;

type UUID = `${string & { length: 8 }}-${string & { length: 4 }}-${string & { length: 4 }}-${string & { length: 4 }}-${string & { length: 12 }}`;

type CircleType = {
  id: number,
  uuid: UUID,
  created_at: any,
  name: string,
  owner: UUID,
  description: string,
  private: boolean
}

type Post = {
  id: number,
  uuid: UUID,
  created_at: any,
  url: string,
  circleUUID: UUID,
  userUUID: UUID,
  description: string,
  title: string,
}