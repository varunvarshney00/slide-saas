import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export const Notifications = () => {
    return (
        <Button className="bg-white rounded-full py-6">
            <Bell
                color="#3352cc"
                fill="#3352cc"
            />
        </Button>
    )
}