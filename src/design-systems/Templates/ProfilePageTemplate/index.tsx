'use client'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from 'design-systems/Atoms/Button'
import { InputLabel } from 'design-systems/Atoms/InputLabel'
import { Typography } from 'design-systems/Atoms/Typography'
import { useProfile } from 'hooks/apis/useProfile'
import { UserProfileResponse, profileBlock } from 'api-services/interfaces/profile'
import { IMG } from 'assets/images'
import { useGetProfileByUserId } from 'hooks/apis/useGetProfileByUserId'

export const ProfilePageTemplate: React.FC = () => {
  const [relocate, setRelocate] = useState<boolean>(true)
  const { isLoading, postProfile, error, updateProfile } = useProfile()
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined
  const { isLoadingProfileID, profileID } = useGetProfileByUserId(String(email))
  const [profile, setProfile] = useState<profileBlock>({
    full_name: '',
    portfolio: '',
    bio: '',
    profile_image: '',
    cover_image: '',
  })

  const inputRef = useRef<any>(null)
  const inputRefCover = useRef<any>(null)

  const token = typeof window !== 'undefined' ? localStorage?.getItem('Token') : null
  const UploadClick = () => {
    inputRef.current.click()
  }
  const uploadCoverClick = () => {
    inputRefCover.current.click()
  }

  useEffect(() => {
    if (token === null) {
      setRelocate(false)
      location.href = '/'
    } else {
      setRelocate(true)
    }
  }, [token])
  useMemo(() => {
    if (profileID?.id) {
      setProfile({
        full_name: String(profileID?.fullName),
        portfolio: String(profileID?.portfolio),
        bio: String(profileID?.bio),
        profile_image: profileID?.profileImage,
        cover_image: profileID?.coverImage,
      })
    }
  }, [profileID])
  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, cover_image: e.target.files[0] })
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, profile_image: e.target.files[0] })
    }
  }
  const handleSubmit = async () => {
    try {
      if (profileID?.id) {
        const value = profile
        if (typeof value.cover_image === typeof profileID.coverImage) {
          delete value.cover_image
        }
        if (typeof value.profile_image === typeof profileID.profileImage) {
          delete value.profile_image
        }
        const result: UserProfileResponse = await updateProfile(value)
        if (result) {
          toast.success('Profile Updated Successfully', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setProfile({
            full_name: String(result?.fullName),
            portfolio: String(result?.portfolio),
            bio: String(result?.bio),
            profile_image: result?.profileImage,
            cover_image: result?.coverImage,
          })
        }
      } else {
        const result: UserProfileResponse = await postProfile(profile)
        if (result) {
          toast.success('Profile Crreate Successfully', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setProfile({
            full_name: String(result?.fullName),
            portfolio: String(result?.portfolio),
            bio: String(result?.bio),
            profile_image: result?.profileImage,
            cover_image: result?.coverImage,
          })
        }
      }
    } catch (error) {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  return (
    <>
      {relocate && (
        <div className="">
          <div className="relative flex w-full flex-wrap  content-end py-8">
            <Image
              alt="cover_image"
              className=" flex h-full w-full flex-wrap content-start bg-papayawhipDD xsm:h-[350px] md:content-end lg:h-[450px]  xxl:h-[540px]"
              height={100}
              src={
                (typeof profile.cover_image === 'object'
                  ? URL.createObjectURL(profile.cover_image)
                  : profile.cover_image) || IMG.cover_image
              }
              width={100}
            />
            <div className="container absolute my-6 grid xsm:self-end">
              <Button
                className="w-[194px]"
                hover={true}
                outlineBorder={false}
                text="Add/Update Cover"
                onClick={() => uploadCoverClick()}
              />
              <input ref={inputRefCover} style={{ display: 'none' }} type="file" onChange={e => handleChangeCover(e)} />
            </div>
            <div className="absolute -bottom-[128px] right-[0px] grid w-full justify-center gap-y-4 rounded-full xsm:w-60 xl:right-[80px] ">
              <Image
                alt="profile_image"
                className="h-[200px] w-[200px] rounded-full bg-[#B4B4B4]"
                height={200}
                src={
                  (typeof profile.profile_image === 'object'
                    ? URL.createObjectURL(profile.profile_image)
                    : profile.profile_image) || IMG.profile_image
                }
                // src={URL.createObjectURL(profile.profile_image as File)}
                width={200}
              />
              <div>
                <Button
                  className="w-[194px]"
                  hover={true}
                  outlineBorder={false}
                  text="Select File"
                  onClick={() => UploadClick()}
                />
                <input ref={inputRef} style={{ display: 'none' }} type="file" onChange={e => handleChange(e)} />
              </div>
            </div>
          </div>
          <div className="container mt-24 grid !justify-start gap-y-14 py-16 xl:mt-0 ">
            <div className="w-[100%] ">
              <Typography className="text-[24px] font-semibold">Edit Profile</Typography>
              <Typography className="text-[19px] text-black3">
                You can set preferred display name, create your branded profile URL and manage other personal settings
              </Typography>
            </div>
            <div className="grid w-[100%] gap-y-10 ">
              <InputLabel
                inputType={'text'}
                label="Display Name"
                value={profile.full_name}
                onChange={(e: any) => setProfile({ ...profile, full_name: e.target.value })}
              />
              <InputLabel
                inputType={'text'}
                label="Personal Site or Portfolio"
                value={profile.portfolio}
                onChange={(e: any) => setProfile({ ...profile, portfolio: e.target.value })}
              />
              <InputLabel
                className="h-[204px] resize-none"
                inputType={'textarea'}
                label="Bio"
                value={profile.bio}
                onChange={(e: any) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>
            <div className="flex justify-center">
              <Button
                className="w-[194px]"
                disabled={
                  Boolean(profile.full_name === '') ||
                  Boolean(profile.portfolio === '') ||
                  Boolean(profile.bio === '') ||
                  Boolean(profile.profile_image === '')
                }
                hover={true}
                text="Add/Update Cover"
                onClick={() => handleSubmit()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
