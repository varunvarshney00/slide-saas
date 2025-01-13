import { duplicateValidation } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type InitialStateTriggerProps = {
    trigger?: {
        type?: 'COMMENT' | 'DM'
        keyword?: 'string',
        types?: string[],
        keywords?: string[]
    }
}

const InitialState: InitialStateTriggerProps = {
    trigger: {
        type: undefined,
        keyword: undefined,
        types: [],
        keywords: []
    }
}

export const AUTOMATION = createSlice({
    name: 'automation',
    initialState: InitialState,
    reducers: {
        TRIGGER: (state, action: PayloadAction<InitialStateTriggerProps>) => {
            state.trigger!.types = duplicateValidation(
                state.trigger?.types!,
                action.payload.trigger?.type!
            )
            return state
        }
    }
})

export const { TRIGGER } = AUTOMATION.actions
export default AUTOMATION.reducer