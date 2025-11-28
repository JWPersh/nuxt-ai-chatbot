export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const { input, model } = await readBody(event)
  const db = useDrizzle()

  const [chat] = await db.insert(tables.chats).values({
    title: '',
    userId: session.user?.id || session.id,
    model: model as 'openai/gpt-5-nano' | 'anthropic/claude-haiku-4.5' | 'google/gemini-2.5-flash'
  }).returning()
  if (!chat) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create chat' })
  }

  await db.insert(tables.messages).values({
    chatId: chat.id,
    role: 'user',
    model: 'openai/gpt-5-nano',
    parts: [{ type: 'text', text: input }]
  })

  return chat
})
