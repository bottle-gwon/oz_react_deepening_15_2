import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useBoardStore = create(
    persist(
            (set)=> ({
            data: [],
            addBoard: (item) => set((state) => ({ data: [...state.data, item]})),              //보드 추가
            removeBoard: (id) => set((state) => ({data: state.data.filter(el => el.id !== id)})),        //보드 제거
            updateBoard: (item) => set((state) => ({data: state.data.map( el => el.id === item.id ? item : el )})),      //보드 정보 업데이트
            updateBoardType: (id, newType) =>
                set((state) => ({
                    data: state.data.map((item) => (item.id === id ? {...item, type: newType} : item))
                })),
            reorderItems: (newData) => set({ data: newData })
        }),
        {
            name: 'board-storage',
            storage:createJSONStorage(()=> localStorage)
        }
    )

)