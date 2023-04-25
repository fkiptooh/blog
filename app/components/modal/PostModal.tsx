'use client'
import useRentModal from "@/app/hooks/usePostModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    IMAGES = 2,
    DESCRIPTION = 3,
  }

const PostModal = ()=> {
    const router = useRouter()
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const { 
      register, 
      handleSubmit,
      setValue,
      watch,
      formState: {
        errors,
      },
      reset,
    } = useForm<FieldValues>({
      defaultValues: {
        category: '',
        location: null,
        imageSrc: '',
        title: '',
        description: '',
      }
    });

    const category = watch('category');
    const location = watch('location');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(()=> dynamic(()=> import('../Map'), {
        ssr: false
    }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })
      }
    
      const onBack = () => {
        setStep((value) => value - 1);
      }
    
      const onNext = () => {
        setStep((value) => value + 1);
      }

      const onSubmit: SubmitHandler<FieldValues> =(data) => {
        if (step !== STEPS.DESCRIPTION) {
            return onNext();
        }

        setIsLoading(true)

        axios.post(`/api/posts`, data)
            .then(()=> {
                toast.success('Post created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch(()=> {
                toast.error('Something went wrong');
            }).finally(()=> {
                setIsLoading(false)
            })
      }

    const actionLabel = useMemo(() => {
        if (step === STEPS.DESCRIPTION) {
          return 'Create'
        }
    
        return 'Next'
      }, [step]);
    
      const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
          return undefined
        }
    
        return 'Back'
      }, [step]);

      let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these describe the coverage of your post?"
            subtitle="Pick a category"
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
          >
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => 
                    setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      )
    
      if (step === STEPS.LOCATION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Where is the event happening/happend?"
              subtitle="Help the reader know the location!"
            />
            <CountrySelect 
              value={location} 
              onChange={(value) => setCustomValue('location', value)} 
            />
            <Map
                center={location?.latlng}
            />
          </div>
        );
      }

      if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Attach a photo"
                    subtitle="Show people how the event looked like"
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value)=> setCustomValue('imageSrc', value)}
                />
            </div>
        )
      }

      if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe the post"
                    subtitle="Short and sweet desription works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
      }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Create a post"
            body={bodyContent}
        />
    )
}

export default PostModal;