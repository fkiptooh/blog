'use client'
import Container from "../Container";
import { TbBeach, TbMountain } from 'react-icons/tb'
import { GiBoatFishing, GiCactus, GiForestCamp,} from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { FaGlobe, FaPeace, FaWater } from 'react-icons/fa';
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Trending',
        icon: FaPeace,
        description: "This are the trending events"
    },
    {
        label: 'Coastal',
        icon: TbBeach,
        description: "This post happend around the coastal region"
    },
    {
        label: 'Urban',
        icon: MdOutlineVilla,
        description: "This post happened in the urban region"
    },
    {
        label: 'Mashinani',
        icon: TbMountain,
        description: "This event occured in the countryside"
    },
    {
        label: 'Globe',
        icon: FaGlobe,
        description: "This post covers news outside Kenya"
    },
    {
        label: 'Lakes',
        icon: GiBoatFishing,
        description: "This post is associated with the lake region"
    },
    {
        label: 'Forest',
        icon: GiForestCamp,
        description: "This post covers arears around the forest"
    },
    {
        label: 'Peace',
        icon: FaPeace,
        description: "This post covers posts on peace"
    },
    {
        label: 'Water',
        icon: FaWater,
        description: "This post covers on water conservation"
    },
    {
        label: 'Arid/Semi-Arid',
        icon: GiCactus,
        description: "This event occured in the arid region"
    },
  
]

const Categories = () => {

    const params = useSearchParams()
    const category = params?.get('category');
    const pathname = usePathname()

    const isMainPage = pathname === '/'

    if (!isMainPage) {
        return null;
    }
    return (
        <Container>
            <div className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            ">
                {categories.map((item)=>
                    (<CategoryBox
                        key={item.label}
                        label={item.label}
                        selected= {category === item.label}
                        icon={item.icon}
                    />)
                )}
            </div>
        </Container>
    )
}
export default Categories;