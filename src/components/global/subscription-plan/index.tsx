import { useQueryUser } from "@/hooks/user-queries";

type Props = {
    type: 'FREE' | 'PRO';
    children: React.ReactNode;
}

export const SubscriptioPlan = ({ children, type }: Props) => {
    const { data } = useQueryUser();
    // console.log('dataquery-->',data)
    return data?.data?.subscription?.plan === type && children
}