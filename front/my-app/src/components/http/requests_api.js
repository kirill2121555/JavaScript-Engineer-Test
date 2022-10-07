import { $host } from "./index";

export const superhero = async (id) => {
    const {data}  = await $host.get('superhero/'+id)
    return data
}
