import { useListener } from '@/hooks/use-automations';
import React from 'react'
import TriggerButton from '../trigger-button';
import { AUTOMATION_LISTENERS } from '@/constants/automation';
import { cn } from '@/lib/utils';
import { SubscriptioPlan } from '../../subscription-plan';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '../../loader';

type Props = {
  id: string
}

const ThenAction = ({ id }: Props) => {

  const {
    onSetListener,
    register,
    onFormSubmit,
    listener: Listener,
    isPending
  } = useListener(id);

  return (
    <TriggerButton label="Then">
      <div className='flex flex-col gap-y-2'>
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === 'SMARTAI' ?
            <SubscriptioPlan
              key={listener.type}
              type='PRO'
            >
              <div
                key={listener.id}
                onClick={() => onSetListener(listener.type)}
                className={cn(
                  Listener === listener.type
                    ? 'bg-gradient-to-br from-[#3352cc] to-[#1c2d70]'
                    : 'bg-backgrounf-80',
                  'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
                )}>
                <div className='flex gap-x-2 items-center'>
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </SubscriptioPlan>

            : (
              <div
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  Listener === listener.type
                    ? 'bg-gradient-to-br from-[#3352cc] to-[#1c2d70]'
                    : 'bg-background-80',
                  'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
                )}
              >
                <div className='flex gap-x-2 items-center'>
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>

            ))}

        <form
          onSubmit={onFormSubmit}
          className='flex flex-col gap-y-2'
        >
          <Textarea
            placeholder={
              Listener === 'SMARTAI'
                ? 'Add a prompt that your smart ai can use...'
                : 'Add a message that you want to send to your custormers...'
            }
            {...register('prompt')}
            className='bg-background-80 outline-none border-none ring-0 focus:ring-0'
          />

          <Input
            {...register('reply')}
            placeholder='Add a reply for comments (Optional)'
            className='bg-background-80 outline-none border-none ring-0 focus:ring-0'
          />

          <Button className='bg-gradient-to-br w-full from-[#3352cc] font-medium text-white to-[#1c2d70]'>
            <Loader state={isPending}>Add Listener</Loader>
          </Button>

        </form>
      </div>
    </TriggerButton >
  )
}

export default ThenAction