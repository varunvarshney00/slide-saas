import { Input } from '@/components/ui/input';
import { useKeywords } from '@/hooks/use-automations';
import { useMutationDataState } from '@/hooks/use-mutation-data';
import { useQueryAutomation } from '@/hooks/user-queries';
import React from 'react'

type Props = {
  id: string
}

const Keywords = ({ id }: Props) => {

  const { keyword, onValueChange, onKeyPress, deleteMutation } = useKeywords(id);
  const { latestVariable } = useMutationDataState(['add-keyword'])
  const { data } = useQueryAutomation(id);
  // console.log('dataqa-->',data.data?.keywords)

  return (
    <div className='bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl'>
      <p className='text-sm text-text-secondary'>Add words that trigger automations.</p>
      <div>
        {data?.data?.keywords && data?.data?.keywords.length > 0 && data?.data?.keywords.map((word) =>
          word.id !== latestVariable?.variables?.id && (
            <div key={word?.id} className="bg-background-80 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full">
              <p>{word.word}</p>
            </div>
          )
        )}

        {latestVariable && latestVariable.status === 'pending' && (
          <div className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full">
            {latestVariable.variables.keyword}
          </div>
        )}

        <Input
          placeholder='Add Keyword...'
          style={{
            width: Math.min(Math.max(keyword.length || 10, 2), 50) + 'ch',
          }}
          value={keyword}
          className='p-0 bg-transparent ring-0 border-none outline-none'
          onChange={onValueChange}
          onKeyUp={onKeyPress}
        />


      </div>
    </div>
  )
}

export default Keywords