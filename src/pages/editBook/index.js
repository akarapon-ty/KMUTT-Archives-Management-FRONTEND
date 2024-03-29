import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useForm, FormProvider } from 'react-hook-form'

import { FormInsert, Edit } from './style'
import DefaultLayoutStyle from '../../components/util/LayoutStyle'
import StepOne from '../../components/editBook/StepOne'
import StepTwo from '../../components/editBook/StepTwo'
import StepThree from '../../components/editBook/StepThree'

import ControlStep from '../../components/editBook/ControlStep'

const EditBook = () => {
  const DOCUMENT_QUERY = gql`
  query document($pk: Int!){
    document(pk: $pk){
      document{
          version,
          amountPage,
          title,
          titleAlternative,
          tableOfContents,
          summary,
          abstract,
          note,
          format,
          formatExtent,
          identifierURL,
          identifierISBN,
          source,
          language,
          coverageSpatial,
          coverageTemporal,
          coverageTemporalYear,
          rights,
          rightsAccess,
          thesisDegreeName,
          thesisDegreeLevel,
          thesisDegreeDiscipline,
          thesisDegreeGrantor,
          recCreateAt,
          recCreateBy,
          recModifiedAt,
          recModifiedBy,
          relation,
          type,
          creator,
          creatorOrgName,
          publisher,
          publisherEmail,
          contributor{
            name,
            role,
          },
          issuedDate,
          tag,
          image,
      }
    }
  }
`

  const UPDATE_DOCUMENT = gql`
    mutation updateDocument($documentId: Int!, $body: UpdateDocumentInput!){
      updateDocument(documentId: $documentId, body: $body){
        updatestatus,
        error
      }
    }
  `

  const UPDATE_TAG = gql`
    mutation overrideUserKeyword($keywords: [String]!, $documentId: Int!){
      overrideUserKeyword(keywords: $keywords, documentId: $documentId){
        status,
        message
      }
    }
  `

  const {
    register, handleSubmit, setValue, getValues, control, errors,
  } = useForm()

  const params = new URLSearchParams(window.location.search)
  if (!params.get('id')) {
    window.location.replace('/homepage')
  }
  const documentId = parseInt(params.get('id'), 10)

  const defaultInformation = {
    title: '',
    titleAlternative: '',
    tableOfContents: '',
    abstract: '',
    summary: '',
    note: '',
    format: '',
    formatExtent: '',
    identifierURL: '',
    identifierISBN: '',
    source: '',
    language: '',
    coverageSpatial: '',
    coverageTemporal: '',
    coverageTemporalYear: '',
    rights: '',
    rightsAccess: '',
    thesisDegreeName: '',
    thesisDegreeLevel: '',
    thesisDegreeDiscipline: '',
    thesisDegreeGrantor: '',
    recCreateAt: '',
    recCreateBy: '',
    recModifiedAt: '',
    recModifiedBy: '',
    tag: [''],
    relation: [''],
    type: '',
    creator: '',
    creatorOrgName: '',
    publisher: '',
    publisherEmail: '',
    contributor: [''],
    contributorRole: [''],
    issuedDate: '',
    image: '',
  }

  const [newInformation, setNewInformation] = useState(defaultInformation)
  const [activeStep, setActiveStep] = useState(0)

  const setData = (dataQuery) => {
    let tempContributorRole = ['']
    let tempContributorName = ['']
    if (typeof (dataQuery.contributor) !== 'undefined') {
      if (dataQuery.contributor.length >= 1) {
        tempContributorRole = dataQuery.contributor.map((row) => row.role)
        tempContributorName = dataQuery.contributor.map((row) => row.name)
      }
    }

    const TempQuery = { ...dataQuery, contributorRole: tempContributorRole, contributor: tempContributorName }
    if (TempQuery.relation.length === 0) {
      TempQuery.relation = ['']
    }
    setNewInformation(TempQuery)
  }

  const { loading: documentDataLoading, error: documentDataError } = useQuery(DOCUMENT_QUERY, {
    variables: { pk: documentId },
    onCompleted: ({ document }) => setData(document.document),
  })

  const [updateDocument, { error: errorUpdateDocument }] = useMutation(UPDATE_DOCUMENT)
  const [updateTag, { error: errorUpdateTag }] = useMutation(UPDATE_TAG)

  if (errorUpdateDocument) {
    window.console.log('Error Update Document', errorUpdateDocument)
  }

  if (errorUpdateTag) {
    window.console.log('Error Update Tag', errorUpdateTag)
  }

  const handlerOnSubmit = (data) => {
    setNewInformation({ ...newInformation, ...data })
    let tempData = { ...newInformation, ...data }
    tempData = {
      dcTitle: tempData.title,
      dcTitleAlternative: tempData.titleAlternative,
      dcDescriptionTableOfContents: tempData.tableOfContents,
      dcDescriptionNote: tempData.note,
      dcDescriptionSummary: tempData.summary,
      dcDescriptionAbstract: tempData.abstract,
      dcFormat: tempData.format,
      dcFormatExtent: tempData.formatExtent,
      dcIdentifierURL: tempData.identifierURL,
      dcIdentifierISBN: tempData.identifierISBN,
      dcSource: tempData.source,
      dcLanguage: tempData.language,
      dcCoverageSpatial: tempData.coverageSpatial,
      dcCoverageTemporal: tempData.coverageTemporal,
      dcCoverageTemporalYear: tempData.coverageTemporalYear,
      dcRights: tempData.rights,
      dcRightsAccess: tempData.rightsAccess,
      thesisDegreeName: tempData.thesisDegreeName,
      thesisDegreeLevel: tempData.thesisDegreeLevel,
      thesisDegreeDiscipline: tempData.thesisDegreeDiscipline,
      thesisDegreeGrantor: tempData.thesisDegreeGrantor,
      creator: tempData.creator,
      creatorOrgname: tempData.creatorOrgName,
      publisher: tempData.publisher,
      publisherEmail: tempData.publisherEmail,
      contributor: tempData.contributor,
      contributorRole: tempData.contributorRole,
      issuedDate: tempData.issuedDate,
      type: tempData.type,
      relation: tempData.relation,
    }
    updateDocument({ variables: { documentId, body: tempData } }).then(() => {
      updateTag({ variables: { documentId, keywords: newInformation.tag } }).then(() => window.location.replace(`/editbook?id=${documentId}`))
    })
  }

  if (documentDataLoading) {
    return null
  }

  if (documentDataError) {
    window.console.log('oldData error', documentDataError)
    return null
  }
  const handlerBackStep = () => {
    setActiveStep((prevState) => prevState - 1)
    const tempValue = getValues()
    window.scrollTo(0, 0)
    setNewInformation({ ...newInformation, ...tempValue })
  }

  const handlerNextStep = () => {
    setActiveStep((prevState) => prevState + 1)
    const tempValue = getValues()
    window.scrollTo(0, 0)
    setNewInformation({ ...newInformation, ...tempValue })
  }

  const handlerRemoveRelation = (index) => {
    const tempTag = [...newInformation.relation]
    tempTag.splice(index, 1)
    setNewInformation({ ...newInformation, relation: tempTag })
  }

  const handlerAddRelation = () => {
    let newData = [...newInformation.relation]
    if (newData.length === 0) {
      newData = ['', '']
    } else {
      newData.push('')
    }
    setNewInformation({ ...newInformation, relation: newData })
  }

  const handleOnChangeRelation = (ind, val) => {
    const temp = [...newInformation.relation]
    temp[ind] = val
    setNewInformation({ ...newInformation, relation: temp })
  }

  const handlerAddTag = () => {
    const tagAddValue = getValues('Tag / Keyword')
    const tempTag = [...newInformation.tag]
    let alreadyKeyword = false
    tempTag.map((temp) => {
      if (temp === tagAddValue) {
        alreadyKeyword = true
      }
      return { }
    })
    if (!alreadyKeyword) {
      tempTag.push(tagAddValue)
      setNewInformation({ ...newInformation, tag: tempTag })
    }
    setValue('Tag / Keyword', '')
  }

  const handlerRemoveTag = (key) => {
    const tempTag = [...newInformation.tag]
    tempTag.splice(key, 1)
    setNewInformation({ ...newInformation, tag: tempTag })
  }
  const handlerRemoveContributor = (index) => {
    const tempCon = [...newInformation.contributor]
    const tempRole = [...newInformation.contributorRole]

    tempCon.splice(index, 1)
    tempRole.splice(index, 1)

    setNewInformation({ ...newInformation, contributor: tempCon, contributorRole: tempRole })
  }
  const handlerAddContributor = () => {
    let newData = [...newInformation.contributor]
    let newRole = [...newInformation.contributorRole]
    if (newData.length === 0) {
      newData = ['', '']
    } else {
      newData.push('')
    }

    if (newRole.length === 0) {
      newRole = ['', '']
    } else {
      newRole.push('')
    }
    setNewInformation({ ...newInformation, contributor: newData, contributorRole: newRole })
  }

  const handlerOnChangeContributor = (index, value) => {
    const temp = [...newInformation.contributor]
    temp[index] = value
    setNewInformation({ ...newInformation, contributor: temp })
  }

  const handlerOnChangeContributorRole = (index, value) => {
    const temp = [...newInformation.contributorRole]
    temp[index] = value
    setNewInformation({ ...newInformation, contributorRole: temp })
  }

  const handlerActiveStep = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <StepOne value={newInformation} handlerAddContributor={handlerAddContributor} handlerOnChangeContributor={handlerOnChangeContributor} handlerOnChangeContributorRole={handlerOnChangeContributorRole} handlerRemoveContributor={handlerRemoveContributor} />
      case 1:
        return <StepTwo handlerAddRelation={handlerAddRelation} value={newInformation} handlerRemoveRelation={handlerRemoveRelation} handleOnChangeRelation={handleOnChangeRelation} />
      default:
        return <StepThree handlerAddTag={handlerAddTag} value={newInformation} handlerRemoveTag={handlerRemoveTag} />
    }
  }

  return (
    <>
      <FormProvider register={register} handleSubmit={handleSubmit} setValue={setValue} getValues={getValues} control={control} errors={errors}>
        <FormInsert onSubmit={handleSubmit(handlerOnSubmit)}>
          <h3>Edit Book</h3>
          <DefaultLayoutStyle>
            <Edit>
              {handlerActiveStep(activeStep)}
              <ControlStep
                handlerBackStep={handlerBackStep}
                handlerNextStep={handlerNextStep}
                show
                disableBack={activeStep === 0}
                disableNext={activeStep === 2}
              />
            </Edit>
          </DefaultLayoutStyle>
        </FormInsert>
      </FormProvider>
    </>
  )
}

export default EditBook
