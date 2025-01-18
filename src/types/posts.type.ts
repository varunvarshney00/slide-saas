export type InstagramPostProps = {
    id: string
    media_type: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
    media_url: string
    timestamp: Date
    caption?: string
}