'use client'

import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import type { WorkExperience } from '@/graphql/generated/graphql'
import { useDeleteUserWorkExperienceMutation } from '@/graphql/generated/hooks'
import { useToggle } from '@/hooks/utils/use-toggle'
import dayjs from '@/lib/dayjs'
import { Button } from '@hackquest/ui/shared/button'
import * as React from 'react'
import toast from 'react-hot-toast'
import { FiEdit3 } from 'react-icons/fi'
import { LuDot, LuPlus, LuTrash2 } from 'react-icons/lu'
import { EMPLOYMENT_TYPES } from '../../constants'
import { calcExperience } from '../../utils'
import { useUserAttestations, useUserProfile } from '../../utils/query'
import { useAttestationStore, useDialogStore } from '../../utils/store'
import { AttestButton } from '../attestations/attest-button'
import { AttestationsPreview } from '../attestations/attestations-preivew'

export type SafeWorkExperience = Omit<
  WorkExperience,
  'userProfile' | 'createdAt' | 'updatedAt' | 'userId' | 'isCurrentWork'
>

export function Experience() {
  const { data: profile } = useUserProfile()
  const { data: attestations } = useUserAttestations()
  const { onOpen: onDialogOpen } = useDialogStore()
  const { onOpen: onAttestationOpen } = useAttestationStore()
  const [open, onOpenChange] = useToggle(false)
  const deletedId = React.useRef<string | null>(null)

  const remove = useDeleteUserWorkExperienceMutation({
    meta: {
      invalidates: [['FindUserProfile']],
    },
  })

  const noExperience = profile?.workExperiences?.length === 0

  const renderWorkType = React.useCallback(
    (employmentType: WorkExperience['employmentType']) => {
      return EMPLOYMENT_TYPES.find(type => type.value === employmentType)?.label
    },
    [],
  )

  const experiences = React.useMemo(() => {
    return profile?.workExperiences?.map(experience => {
      return {
        ...experience,
        attestations: attestations?.filter(
          attestation => attestation.sourceId === experience.id,
        ),
      }
    })
  }, [profile?.workExperiences, attestations])

  const sortedExperiences = React.useMemo(() => {
    return experiences?.sort((a, b) =>
      dayjs(a.startDate).isBefore(dayjs(b.startDate)) ? 1 : -1,
    )
  }, [experiences])

  function onDelete() {
    if (!deletedId.current) return
    toast
      .promise(
        remove.mutateAsync({
          experienceId: deletedId.current,
        }),
        {
          loading: 'Deleting experience...',
          success: 'Experience deleted',
          error: 'Failed to delete experience',
        },
      )
      .finally(() => {
        onOpenChange(false)
        deletedId.current = null
      })
  }

  if (noExperience && !profile?.isOwnProfile) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="title-3">Experience</h2>
        {profile.isOwnProfile && !noExperience && (
          <Button
            size="small"
            variant="outline"
            color="neutral"
            className="[&>span]:gap-1"
            onClick={() =>
              onDialogOpen('create-experience', { initialValues: null })
            }
          >
            <LuPlus className="size-4" />
            Add
          </Button>
        )}
      </div>
      {noExperience ? (
        <Button
          variant="outline"
          color="neutral"
          onClick={() =>
            onDialogOpen('create-experience', { initialValues: null })
          }
        >
          Add experience
          <LuPlus className="size-4" />
        </Button>
      ) : (
        sortedExperiences?.map(experience => (
          <div
            key={experience.id}
            className="flex flex-col gap-3 border-b border-b-neutral-200 pb-6 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-6 sm:gap-24">
              <div className="space-y-0.5">
                <div className="body-s flex flex-col gap-0.5 sm:flex-row sm:items-center">
                  <span className="headline-s">{experience.title}</span>
                  <LuDot className="max-sm:hidden" />
                  <div className="flex items-center gap-0.5">
                    <span className="whitespace-nowrap">
                      {experience.companyName}
                    </span>
                    <LuDot />
                    <span className="whitespace-nowrap">
                      {renderWorkType(experience.employmentType)}
                    </span>
                  </div>
                  {!profile.isOwnProfile && (
                    <AttestButton
                      className="ml-2 max-sm:hidden"
                      onClick={() => {
                        onAttestationOpen({
                          type: 'Experience',
                          sourceId: experience.id,
                        })
                      }}
                    />
                  )}
                </div>
                <div className="body-s flex items-center gap-0.5 text-secondary-neutral">
                  <span>
                    {dayjs(experience.startDate).format('MMM YYYY')} -{' '}
                    {experience.endDate
                      ? dayjs(experience.endDate).format('MMM YYYY')
                      : 'Present'}
                  </span>
                  <LuDot />
                  <span>
                    {calcExperience(experience.startDate, experience.endDate)}
                  </span>
                </div>
                <p className="body-s text-secondary-neutral">
                  {experience.location}
                </p>
                <p className="body-s line-clamp-3 text-secondary-neutral">
                  {experience.description}
                </p>
              </div>
              {profile.isOwnProfile && (
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="outline-none"
                    onClick={() => {
                      onDialogOpen('create-experience', {
                        initialValues: experience,
                      })
                    }}
                  >
                    <FiEdit3 className="mt-0.5 size-5" />
                  </button>
                  <button
                    type="button"
                    className="outline-none"
                    onClick={() => {
                      deletedId.current = experience.id
                      onOpenChange(true)
                    }}
                  >
                    <LuTrash2 className="size-5" />
                  </button>
                </div>
              )}
            </div>
            <AttestationsPreview attestations={experience.attestations} />
            {!profile.isOwnProfile && (
              <AttestButton
                className="sm:hidden"
                onClick={() => {
                  onAttestationOpen({
                    type: 'Experience',
                    sourceId: experience.id,
                  })
                }}
              />
            )}
          </div>
        ))
      )}
      <DeleteAlertDialog
        open={open}
        onOpenChange={() => {
          onOpenChange(false)
          deletedId.current = null
        }}
        loading={remove.isPending}
        title="Delete experience"
        description="Are you sure you want to delete this experience? This action cannot be undone."
        onConfirm={onDelete}
      />
    </div>
  )
}
