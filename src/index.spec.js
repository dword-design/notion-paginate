import dotenv from '@dword-design/dotenv-json-extended'
import { identity, map, sortBy } from '@dword-design/functions'
import { Client as NotionClient } from '@notionhq/client'

import self from '.'

const databaseId = 'a6d4375c-51c7-483b-b06c-1f37e23c04f9'
dotenv.config()

export default {
  works: async () => {
    const notion = new NotionClient({ auth: process.env.NOTION_API_TOKEN })

    const result = await self(notion.databases.query, {
      database_id: databaseId,
      page_size: 2,
    })
    expect(
      result |> map('properties.Name.title[0].plain_text') |> sortBy(identity)
    ).toEqual(['1', '2', '3', '4', '5'])
  },
}
