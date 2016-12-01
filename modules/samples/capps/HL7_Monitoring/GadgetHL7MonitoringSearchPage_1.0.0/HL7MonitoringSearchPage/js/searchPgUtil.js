var ATTR_TYPES=["meta_host","meta_server_name","correlation_activity_id","service_name","operation_name","status","message_direction","_ACC.AccidentAddress","_ACC.AccidentCode","_ACC.AccidentDeathIndicator","_ACC.AccidentDescription","_ACC.AccidentJobRelatedIndicator","_ACC.AccidentLocation","_ACC.AutoAccidentState","_ACC.BroughtInBy","_ACC.EnteredBy","_ACC.PoliceNotifiedIndicator","_AL1.AllergenCode/Mnemonic/Description","_AL1.AllergenTypeCode","_AL1.AllergyReactionCode","_AL1.AllergySeverityCode","_AL1.IdentificationDate","_APR.FillerOverrideCriteria","_APR.LocationSelectionCriteria","_APR.ResourceSelectionCriteria","_APR.SlotSpacingCriteria","_ARQ.AppointmentDuration","_ARQ.AppointmentDurationUnits","_ARQ.AppointmentReason","_ARQ.AppointmentType","_ARQ.EnteredByLocation","_ARQ.EnteredByPerson","_ARQ.EnteredByPhoneNumber","_ARQ.FillerAppointmentID","_ARQ.FillerOrderNumber","_ARQ.OccurrenceNumber","_ARQ.ParentFillerAppointmentID","_ARQ.ParentPlacerAppointmentID","_ARQ.PlacerContactAddress","_ARQ.PlacerContactLocation","_ARQ.PlacerContactPerson","_ARQ.PlacerContactPhoneNumber","_ARQ.PlacerGroupNumber","_ARQ.PlacerOrderNumber","_ARQ.Priority-ARQ","_ARQ.RepeatingInterval","_ARQ.RepeatingIntervalDuration","_ARQ.RequestedStartDate/TimeRange","_ARQ.RequestEventReason","_ARQ.ScheduleID","_ARV.AccessRestrictionActionCode","_ARV.AccessRestrictionDateRange","_ARV.AccessRestrictionReason","_ARV.AccessRestrictionValue","_ARV.SpecialAccessRestrictionInstructions","_ARV2.AccessRestrictionActionCode","_ARV2.AccessRestrictionDateRange","_ARV2.AccessRestrictionReason","_ARV2.AccessRestrictionValue","_ARV2.SpecialAccessRestrictionInstructions","_DB1.DisabilityEndDate","_DB1.DisabilityIndicator","_DB1.DisabilityReturntoWorkDate","_DB1.DisabilityStartDate","_DB1.DisabilityUnabletoWorkDate","_DB1.DisabledPersonCode","_DB1.DisabledPersonIdentifier","_DG1.AttestationDate/Time","_DG1.ConfidentialIndicator","_DG1.DiagnosingClinician","_DG1.DiagnosisActionCode","_DG1.DiagnosisClassification","_DG1.DiagnosisCode-DG1","_DG1.DiagnosisCodingMethod","_DG1.DiagnosisDate/Time","_DG1.DiagnosisDescription","_DG1.DiagnosisIdentifier","_DG1.DiagnosisPriority","_DG1.DiagnosisType","_DG1.DiagnosticRelatedGroup","_DG1.DRGApprovalIndicator","_DG1.DRGCCLValueCode","_DG1.DRGDiagnosisDeterminationStatus","_DG1.DRGGrouperReviewCode","_DG1.DRGGroupingUsage","_DG1.GrouperVersionAndType","_DG1.MajorDiagnosticCategory","_DG1.OutlierCost","_DG1.OutlierDays","_DG1.OutlierType","_DG1.ParentDiagnosis","_DG1.PresentOnAdmission(POA)Indicator","_DRG.BasicCharge","_DRG.CalculatedDays","_DRG.ConNOfidentialIndicator","_DRG.Discount/Surcharge","_DRG.DRGApprovalIndicator","_DRG.DRGAssignedDate/Time","_DRG.DRGGrouperReviewCode","_DRG.DRGPayor","_DRG.DRGTransferType","_DRG.EffectiveWeight","_DRG.GrouperSoftwareName","_DRG.GrouperSoftwareVersion","_DRG.GrouperStatus","_DRG.MonetaryAmount","_DRG.NameofCoder","_DRG.OutlierCost","_DRG.OutlierDays","_DRG.OutlierReimbursement","_DRG.OutlierType","_DRG.PCCLValueCode","_DRG.RelativeDiscount/Surcharge","_DRG.StatusAdmission","_DRG.StatusAge","_DRG.StatusFinancialCalculation","_DRG.StatusGender","_DRG.StatusLengthofStay","_DRG.StatusPatient","_DRG.StatusRespirationMinutes","_DRG.StatusSameDayFlag","_DRG.StatusSeparationMode","_DRG.StatusWeightatBirth","_DRG.TotalCharge","_DSC.ContinuationStyle","_EQP.EndDate/Time","_EQP.FileName","_EQP.StartDate/Time","_EQP.TransactionData","_EQU.AlertLevel","_EQU.EquipmentState","_EQU.EventDate/Time","_EQU.Local/RemoteControlState","_ERR.ApplicationErrorCode","_ERR.ApplicationErrorParameter","_ERR.DiagnosticInformation","_ERR.ErrorLocation","_ERR.HelpDeskContactPoint","_ERR.HL7ErrorCode","_ERR.InformPersonIndicator","_ERR.OverrideReasonCode","_ERR.OverrideType","_ERR.Severity","_ERR.UserMessage","_EVN.Date/TimePlannedEvent","_EVN.EventFacility","_EVN.EventOccurred","_EVN.EventReasonCode","_EVN.OperatorID","_EVN.RecordedDate/Time","_GT1.AmbulatoryStatus","_GT1.Citizenship","_GT1.ContactPerson'sName","_GT1.ContactPerson'sTelephoneNumber","_GT1.ContactReason","_GT1.ContactRelationship","_GT1.EmploymentStopDate","_GT1.EthnicGroup","_GT1.GuarantorAddress","_GT1.GuarantorAdministrativeSex","_GT1.GuarantorBillingHoldFlag","_GT1.GuarantorBirthPlace","_GT1.GuarantorChargeAdjustmentCode","_GT1.GuarantorCreditRatingCode","_GT1.GuarantorDate-Begin","_GT1.GuarantorDate-End","_GT1.GuarantorDate/TimeOfBirth","_GT1.GuarantorDeathDateAndTime","_GT1.GuarantorDeathFlag","_GT1.GuarantorEmployeeIDNumber","_GT1.GuarantorEmployer'sOrganizationName","_GT1.GuarantorEmployerAddress","_GT1.GuarantorEmployerIDNumber","_GT1.GuarantorEmployerName","_GT1.GuarantorEmployerPhoneNumber","_GT1.GuarantorEmploymentStatus","_GT1.GuarantorFinancialClass","_GT1.GuarantorHireEffectiveDate","_GT1.GuarantorHouseholdAnnualIncome","_GT1.GuarantorHouseholdSize","_GT1.GuarantorMaritalStatusCode","_GT1.GuarantorName","_GT1.GuarantorNumber","_GT1.GuarantorOrganizationName","_GT1.GuarantorPhNum-Business","_GT1.GuarantorPhNum-Home","_GT1.GuarantorPriority","_GT1.GuarantorRace","_GT1.GuarantorRelationship","_GT1.GuarantorSpouseName","_GT1.GuarantorSSN","_GT1.GuarantorType","_GT1.Handicap","_GT1.JobCode/Class","_GT1.JobStatus","_GT1.JobTitle","_GT1.LivingArrangement","_GT1.LivingDependency","_GT1.Mother'sMaidenName","_GT1.Nationality","_GT1.PrimaryLanguage","_GT1.ProtectionIndicator","_GT1.PublicityCode","_GT1.Religion","_GT1.StudentIndicator","_GT1.VIPIndicator","_INV.AvailableQuantity","_INV.ConsumptionQuantity","_INV.ContainerCarrierIdentifier","_INV.CurrentQuantity","_INV.ExpirationDate/Time","_INV.FirstUsedDate/Time","_INV.InitialQuantity","_INV.InventoryContainerIdentifier","_INV.ManufacturerIdentifier","_INV.ManufacturerLotNumber","_INV.OnBoardStabilityDuration","_INV.OnBoardStabilityTime","_INV.PositiononCarrier","_INV.QuantityUnits","_INV.SubstanceStatus","_INV.SubstanceType","_INV.SupplierIdentifier","_INV.TargetValue","_INV.Test/FluidIdentifier(s)","_ISD.InteractionActiveState","_ISD.InteractionTypeIdentifier","_MFI.EffectiveDate/Time","_MFI.EnteredDate/Time","_MFI.File-LevelEventCode","_MFI.MasterFileApplicationIdentifier","_MFI.ResponseLevelCode","_MSA.DelayedAcknowledgmentType","_MSA.ErrorCondition","_MSA.ExpectedSequenceNumber","_MSA.MessageControlID","_MSA.MessageWaitingNumber","_MSA.MessageWaitingPriority","_MSA.TextMessage","_MSH.AcceptAcknowledgmentType","_MSH.AlternateCharacterSetHandlingScheme","_MSH.ApplicationAcknowledgmentType","_MSH.CharacterSet","_MSH.ContinuationPointer","_MSH.CountryCode","_MSH.Date/TimeOfMessage","_MSH.EncodingCharacters","_MSH.MessageControlID","_MSH.MessageProfileIdentifier","_MSH.MessageType","_MSH.PrincipalLanguageOfMessage","_MSH.ProcessingID","_MSH.ReceivingApplication","_MSH.ReceivingFacility","_MSH.ReceivingNetworkAddress","_MSH.ReceivingResponsibleOrganization","_MSH.Security","_MSH.SendingApplication","_MSH.SendingFacility","_MSH.SendingNetworkAddress","_MSH.SendingResponsibleOrganization","_MSH.SequenceNumber","_MSH.VersionID","_NK1.Address","_NK1.AdministrativeSex","_NK1.AmbulatoryStatus","_NK1.BusinessPhoneNumber","_NK1.Citizenship","_NK1.ContactPerson'sAddress","_NK1.ContactPerson'sName","_NK1.ContactPerson'sTelephoneNumber","_NK1.ContactPersonSocialSecurityNumber","_NK1.ContactReason","_NK1.ContactRole","_NK1.Date/TimeOfBirth","_NK1.EndDate","_NK1.EthnicGroup","_NK1.Handicap","_NK1.JobStatus","_NK1.LivingArrangement","_NK1.LivingDependency","_NK1.MaritalStatus","_NK1.Mother'sMaidenName","_NK1.Name","_NK1.Nationality","_NK1.NextofKin/AssociatedPartiesEmployeeNumber","_NK1.NextofKin/AssociatedPartiesJobCode/Class","_NK1.NextofKin/AssociatedPartiesJobTitle","_NK1.NextofKin/AssociatedParty'sIdentifiers","_NK1.NextofKinBirthPlace","_NK1.OrganizationName-NK1","_NK1.PhoneNumber","_NK1.PrimaryLanguage","_NK1.ProtectionIndicator","_NK1.PublicityCode","_NK1.Race","_NK1.Relationship","_NK1.Religion","_NK1.StartDate","_NK1.StudentIndicator","_NK1.VIPIndicator","_NTE.Comment","_NTE.CommentType","_NTE.EffectiveStartDate","_NTE.EnteredBy","_NTE.EnteredDate/Time","_NTE.ExpirationDate","_NTE.SourceofComment","_OBX.AbnormalFlags","_OBX.Date/TimeOftheAnalysis","_OBX.Date/TimeOftheObservation","_OBX.EffectiveDateofReferenceRange","_OBX.EquipmentInstanceIdentifier","_OBX.MoodCode","_OBX.NatureofAbnormalTest","_OBX.ObservationIdentifier","_OBX.ObservationInstanceIdentifier","_OBX.ObservationMethod","_OBX.ObservationResultStatus","_OBX.ObservationSite","_OBX.ObservationSub-ID","_OBX.ObservationValue","_OBX.PerformingOrganizationAddress","_OBX.PerformingOrganizationMedicalDirector","_OBX.PerformingOrganizationName","_OBX.Probability","_OBX.Producer'sID","_OBX.ReferencesRange","_OBX.ResponsibleObserver","_OBX.Units","_OBX.UserDefinedAccessChecks","_OBX.ValueType","_PD1.AdvanceDirectiveCode","_PD1.AdvanceDirectiveLastVerifiedDate","_PD1.DuplicatePatient","_PD1.Handicap","_PD1.ImmunizationRegistryStatus","_PD1.ImmunizationRegistryStatusEffectiveDate","_PD1.LivingArrangement","_PD1.LivingWillCode","_PD1.MilitaryBranch","_PD1.MilitaryRank/Grade","_PD1.MilitaryStatus","_PD1.OrganDonorCode","_PD1.PatientPrimaryCareProviderName&IDNo.","_PD1.PatientPrimaryFacility","_PD1.PlaceofWorship","_PD1.ProtectionIndicator","_PD1.ProtectionIndicatorEffectiveDate","_PD1.PublicityCode","_PD1.PublicityCodeEffectiveDate","_PD1.SeparateBill","_PD1.StudentIndicator","_PDA.AutopsyIndicator","_PDA.AutopsyPerformedBy","_PDA.AutopsyStartandEndDate/Time","_PDA.CoronerIndicator","_PDA.DeathCertificateSignedDate/Time","_PDA.DeathCertifiedBy","_PDA.DeathCertifiedIndicator","_PDA.DeathLocation","_PID.AdministrativeSex","_PID.AlternatePatientID-PID","_PID.BirthOrder","_PID.BirthPlace","_PID.BreedCode","_PID.Citizenship","_PID.CountyCode","_PID.Date/TimeOfBirth","_PID.Driver'sLicenseNumber-Patient","_PID.EthnicGroup","_PID.IdentityReliabilityCode","_PID.IdentityUnknownIndicator","_PID.LastUpdateDate/Time","_PID.LastUpdateFacility","_PID.MaritalStatus","_PID.Mother'sIdentifier","_PID.Mother'sMaidenName","_PID.MultipleBirthIndicator","_PID.Nationality","_PID.PatientAccountNumber","_PID.PatientAddress","_PID.PatientAlias","_PID.PatientDeathDateandTime","_PID.PatientDeathIndicator","_PID.PatientID","_PID.PatientIdentifierList","_PID.PatientName","_PID.PhoneNumber-Business","_PID.PhoneNumber-Home","_PID.PrimaryLanguage","_PID.ProductionClassCode","_PID.Race","_PID.Religion","_PID.SpeciesCode","_PID.SSNNumber-Patient","_PID.Strain","_PID.TribalCitizenship","_PID.VeteransMilitaryStatus","_PV1.AccountStatus","_PV1.AdmissionType","_PV1.AdmitDate/Time","_PV1.AdmitSource","_PV1.AdmittingDoctor","_PV1.AlternateVisitID","_PV1.AmbulatoryStatus","_PV1.AssignedPatientLocation","_PV1.AttendingDoctor","_PV1.BadDebtAgencyCode","_PV1.BadDebtRecoveryAmount","_PV1.BadDebtTransferAmount","_PV1.BedStatus","_PV1.ChargePriceIndicator","_PV1.ConsultingDoctor","_PV1.ContractAmount","_PV1.ContractCode","_PV1.ContractEffectiveDate","_PV1.ContractPeriod","_PV1.CourtesyCode","_PV1.CreditRating","_PV1.CurrentPatientBalance","_PV1.DeleteAccountDate","_PV1.DeleteAccountIndicator","_PV1.DietType","_PV1.DischargeDate/Time","_PV1.DischargeDisposition","_PV1.DischargedtoLocation","_PV1.FinancialClass","_PV1.HospitalService","_PV1.InterestCode","_PV1.OtherHealthcareProvider","_PV1.PatientClass","_PV1.PatientType","_PV1.PendingLocation","_PV1.PreadmitNumber","_PV1.PreadmitTestIndicator","_PV1.PriorPatientLocation","_PV1.PriorTemporaryLocation","_PV1.Re-admissionIndicator","_PV1.ReferringDoctor","_PV1.ServicingFacility","_PV1.TemporaryLocation","_PV1.TotalAdjustments","_PV1.TotalCharges","_PV1.TotalPayments","_PV1.TransfertoBadDebtCode","_PV1.TransfertoBadDebtDate","_PV1.VIPIndicator","_PV1.VisitIndicator","_PV1.VisitNumber","_PV2.AccommodationCode","_PV2.ActualLengthofInpatientStay","_PV2.AdmissionLevelofCareCode","_PV2.AdmitReason","_PV2.AdvanceDirectiveCode","_PV2.AdvanceDirectiveLastVerifiedDate","_PV2.BabyDetainedIndicator","_PV2.BillingMediaCode","_PV2.ClinicOrganizationName","_PV2.EmploymentIllnessRelatedIndicator","_PV2.EstimatedLengthofInpatientStay","_PV2.ExpectedAdmitDate/Time","_PV2.ExpectedDischargeDate/Time","_PV2.ExpectedDischargeDisposition","_PV2.ExpectedLOAReturnDate/Time","_PV2.ExpectedNumberofInsurancePlans","_PV2.ExpectedPre-admissionTestingDate/Time","_PV2.ExpectedSurgeryDateandTime","_PV2.FirstSimilarIllnessDate","_PV2.LivingWillCode","_PV2.MilitaryNon-AvailabilityCode","_PV2.MilitaryPartnershipCode","_PV2.ModeofArrivalCode","_PV2.NewbornBabyIndicator","_PV2.NotifyClergyCode","_PV2.OrganDonorCode","_PV2.PatientChargeAdjustmentCode","_PV2.PatientConditionCode","_PV2.PatientStatusCode","_PV2.PatientStatusEffectiveDate","_PV2.PatientValuables","_PV2.PatientValuablesLocation","_PV2.PrecautionCode","_PV2.PreviousServiceDate","_PV2.PreviousTreatmentDate","_PV2.PurgeStatusCode","_PV2.PurgeStatusDate","_PV2.RecreationalDrugUseCode","_PV2.RecurringServiceCode","_PV2.ReferralSourceCode","_PV2.RetentionIndicator","_PV2.SignatureonFileDate","_PV2.SpecialProgramCode","_PV2.TransferReason","_PV2.VisitDescription","_PV2.VisitPriorityCode","_PV2.VisitProtectionIndicator","_PV2.VisitPublicityCode","_PV2.VisitUserCode","_QAK.HitCountTotal","_QAK.Hitsremaining","_QAK.MessageQueryName","_QAK.QueryResponseStatus","_QAK.Thispayload","_QPD.QueryTag","_QPD.UserParameters(insuccessivefields)","_QRD.DeferredResponseDate/Time","_QRD.DeferredResponseType","_QRD.QuantityLimitedRequest","_QRD.QueryFormatCode","_QRD.QueryID","_QRD.QueryPriority","_QRD.QueryResultsLevel","_QRD.WhatDataCodeValueQual.","_QRD.WhatDepartmentDataCode","_QRD.WhatSubjectFilter","_QRD.WhoSubjectFilter","_QRF.Date/TimeSelectionQualifier","_QRF.OtherQRYSubjectFilter","_QRF.SearchConfidenceThreshold","_QRF.WhatUserQualifier","_QRF.WhenDataEndDate/Time","_QRF.WhenDataStartDate/Time","_QRF.WhenQuantity/TimingQualifier","_QRF.WhichDate/TimeQualifier","_QRF.WhichDate/TimeStatusQualifier","_RCP.ExecutionandDeliveryTime","_RCP.ModifyIndicator","_RCP.QuantityLimitedRequest","_RCP.ResponseModality","_RCP.Segmentgroupinclusion","_RCP.Sort-byField","_ROL.ActionCode","_ROL.Office/HomeAddress/Birthplace","_ROL.OrganizationUnitType","_ROL.Person'sLocation","_ROL.Phone","_ROL.ProviderType","_ROL.Role-ROL","_ROL.RoleActionReason","_ROL.RoleBeginDate/Time","_ROL.RoleDuration","_ROL.RoleEndDate/Time","_ROL.RolePerson","_ROL2.ActionCode","_ROL2.Office/HomeAddress/Birthplace","_ROL2.OrganizationUnitType","_ROL2.Person'sLocation","_ROL2.Phone","_ROL2.ProviderType","_ROL2.Role-ROL","_ROL2.RoleActionReason","_ROL2.RoleBeginDate/Time","_ROL2.RoleDuration","_ROL2.RoleEndDate/Time","_ROL2.RolePerson","_SCD.AbortCycle","_SCD.Alarm","_SCD.AttendingDoctor","_SCD.ConditionTime","_SCD.ControlTemperature","_SCD.CycleCompleteTime","_SCD.CycleCount","_SCD.CycleStartDate/Time","_SCD.CycleType","_SCD.DeviceStatus","_SCD.DilutionFactor","_SCD.DoorOpen","_SCD.DryTime","_SCD.ExhaustTime","_SCD.FillTime","_SCD.InjectionRate","_SCD.InletTemperature","_SCD.LeakRate","_SCD.LoadNumber","_SCD.LonginChargePhase","_SCD.LonginExhaustPhase","_SCD.LonginFastExhaustPhase","_SCD.Operator-Unload","_SCD.OverTemperature","_SCD.PatientIdentifierList","_SCD.ProcedureCode","_SCD.ReadingFailure","_SCD.Reset","_SCD.SterilizerTemperature","_SCD.SterilizeTime","_SCD.TempMax","_SCD.TempMin","_SCD.ThermalRinseTime","_SCD.TotalCycleTime","_SCD.UnderTemperature","_SCD.WashTime","_SCP.DateFormat","_SCP.DeviceModelName","_SCP.DeviceName","_SCP.DeviceNumber","_SCP.DeviceType","_SCP.LaborCalculationType","_SCP.LotControl","_SDD.ControlCode","_SDD.DeviceDataState","_SDD.DeviceName","_SDD.DeviceNumber","_SDD.LoadStatus","_SDD.OperatorName","_SFT.SoftwareBinaryID","_SFT.SoftwareCertifiedVersionorReleaseNumber","_SFT.SoftwareInstallDate","_SFT.SoftwareProductInformation","_SFT.SoftwareProductName","_SLT.BarCode","_SLT.DeviceName","_SLT.ItemIdentifier","_SLT.LotNumber","_UAC.UserAuthenticationCredential","_UB1.BloodDeductible","_UB1.BloodFurnished-Pints","_UB1.BloodNotReplaced-Pints","_UB1.BloodReplaced-Pints","_UB1.Co-InsuranceDays","_UB1.ConditionCode","_UB1.CoveredDays","_UB1.NonCoveredDays","_UB1.NumberOfGraceDays","_UB1.Occurrence","_UB1.OccurrenceSpan","_UB1.OccurSpanEndDate","_UB1.OccurSpanStartDate","_UB1.PSRO/URApprovalIndicator","_UB1.PSRO/URApprovedStay-Fm","_UB1.PSRO/URApprovedStay-To","_UB1.SpecialProgramIndicator","_UB1.UB-82Locator2","_UB1.UB-82Locator27","_UB1.UB-82Locator45","_UB1.UB-82Locator9","_UB1.ValueAmount&Code","_UB2.Co-InsuranceDays(9)","_UB2.ConditionCode(24-30)","_UB2.CoveredDays(7)","_UB2.DocumentControlNumber","_UB2.Non-CoveredDays(8)","_UB2.OccurrenceCode&Date(32-35)","_UB2.OccurrenceSpanCode/Dates(36)","_UB2.SpecialVisitCount","_UB2.UB92Locator11(State)","_UB2.UB92Locator2(State)","_UB2.UB92Locator31(National)","_UB2.UB92Locator49(National)","_UB2.UB92Locator56(State)","_UB2.UB92Locator57(National)","_UB2.UB92Locator78(State)","_UB2.ValueAmount&Code"]
var ATTR_VAR_TYPES=["STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","LONG","STRING","LONG","LONG","LONG","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","DOUBLE","STRING","STRING","STRING","STRING","DOUBLE","DOUBLE","STRING","DOUBLE","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","DOUBLE","STRING","DOUBLE","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","DOUBLE","STRING","LONG","STRING","LONG","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","LONG","LONG","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","DOUBLE","DOUBLE","STRING","DOUBLE","LONG","LONG","DOUBLE","STRING","STRING","STRING","LONG","LONG","STRING","STRING","STRING","STRING","STRING","DOUBLE","STRING","STRING","STRING","LONG","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","LONG","STRING","LONG","LONG","STRING","STRING","LONG","LONG","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","LONG","STRING","STRING","STRING","STRING","LONG","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","DOUBLE","STRING","STRING","STRING","STRING","DOUBLE","STRING","LONG","DOUBLE","STRING","STRING","DOUBLE","LONG","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","DOUBLE","DOUBLE","DOUBLE","STRING","LONG","STRING","STRING","STRING","STRING","DOUBLE","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","LONG","LONG","LONG","STRING","LONG","STRING","LONG","LONG","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","LONG","LONG","STRING","LONG","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","DOUBLE","STRING","LONG","LONG","STRING","LONG","LONG","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","LONG","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","LONG","LONG","STRING","STRING","STRING","STRING","DOUBLE","DOUBLE","DOUBLE","DOUBLE","LONG","STRING","STRING","STRING","STRING","DOUBLE","DOUBLE","LONG","DOUBLE","DOUBLE","DOUBLE","DOUBLE","STRING","STRING","STRING","STRING","DOUBLE","STRING","STRING","STRING","STRING","DOUBLE","DOUBLE","DOUBLE","DOUBLE","LONG","DOUBLE","DOUBLE","DOUBLE","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","DOUBLE","DOUBLE","DOUBLE","STRING","STRING","DOUBLE","STRING","STRING","STRING","LONG","LONG","STRING","STRING","LONG","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING","STRING"];
var OPER_TYPES=["AND","OR"];
var EQUA_TYPES=["=",">","<","<=",">=","Contains"];
var COUNTER=0;
var QUERY_PARAM= [];

var MAXIMUM_LONG=9223372036854775807;
var MINUMUM_LONG=-9223372036854775807;

var MAXIMUM_DOUBLE=Number.MAX_VALUE;
var MINIMUM_DOUBLE=Number.MIN_VALUE;

function getAttrType(attrValue){
  var attrType;
  for(var i=0;i<ATTR_TYPES.length;i++){
    if(ATTR_TYPES[i]==attrValue){
      attrType=ATTR_VAR_TYPES[i];
    }
  }
  return attrType;
}
function LuceneFy(operValue,attrValue,equaValue,value){
  var formattedEqua;
  if(isNull(value)){
    formattedEqua="";
  }
  else{
    formattedEqua=operValue+" "+ attrValue+" : ";
    var getType;
    switch (equaValue) {
        case '=':
        formattedEqua+= value
        break;
        case 'Contains':
        formattedEqua+= value+"*";
        break;
        case '<':
        getType=getAttrType(attrValue);
        console.log(getType);
        if(getType == "STRING"){
          formattedEqua="";
        }
        else if(getType == "LONG"){
          formattedEqua += " {" + MINUMUM_LONG + " TO " + value+"}";
        }
        else if(getType == "DOUBLE"){
          formattedEqua += " {" + MINUMUM_DOUBLE + " TO " + value+"}";
        }
        break;
        case '<=':
        getType=getAttrType(attrValue);
        if(getType == "STRING"){
          formattedEqua="";
        }
        else if(getType == "LONG"){
          formattedEqua += " [" + MINUMUM_LONG + " TO " + value+"]";
        }
        else if(getType == "DOUBLE"){
          formattedEqua += " [" + MINUMUM_DOUBLE + " TO " + value+"]";
        }
        break;
        case '>':
        getType=getAttrType(attrValue);
        if(getType == "STRING"){
          formattedEqua="";
        }
        else if(getType == "LONG"){
          formattedEqua += " {" + value + " TO " + MAXIMUM_LONG+"}";
        }
        else if(getType == "DOUBLE"){
          formattedEqua += " {" + value + " TO " + MAXIMUM_DOUBLE+"}";
        }
        break;
        case '>=':
        getType=getAttrType(attrValue);
        if(getType == "STRING"){
          formattedEqua="";
        }
        else if(getType == "LONG"){
          formattedEqua += " [" + value + " TO " + MAXIMUM_LONG+"]";
        }
        else if(getType == "DOUBLE"){
          formattedEqua += " [" + value + " TO " + MAXIMUM_DOUBLE+"]";
        }
        break;
        default:
        break;
    }
  }
  return formattedEqua
}

function isNull(value){
  var isNull=false;
  if(typeof value === "undefined" || value === null || value === "" ){
    isNull=true;
  }
  return isNull;
}

function createRowOfContents(){
  if(COUNTER < 600){
    $('#addAttri').append('<div id="subAttri_0'+COUNTER+'" class="col-xs-12 add-padding-1x search-if-row"></div>');
    generateDynamicCombo(OPER_TYPES,COUNTER,"type-oper",1,1);
    generateDynamicCombo(ATTR_TYPES,COUNTER,"type-attr",2,5);
    generateDynamicCombo(EQUA_TYPES,COUNTER,"type-equa",3,2);
    generateDynamicTextBox(COUNTER);
    generateDynamicButton(COUNTER);
     COUNTER++;
  }
}
function deleteRowOfContents(){
// ACTION NEEDS TO PERFORM
}

function getComboList(Content,href,role){
  var ComboLi,ComboListTemp=null;
  for(var i=0;i<Content.length;i++){
     ComboLi= '<option value="'+Content[i]
    +'">'+Content[i]+'</option>'
    if(i==0){
      ComboListTemp=ComboLi
    }else{
      ComboListTemp+=ComboLi;
    }
  }
  return ComboListTemp;
};
function generateDynamicCombo(list,COUNTER,role,position,length){
  var href="javascript:void(0)";
  var ComboList=getComboList(list,href,role);
     $('#subAttri_0'+COUNTER+'').append('<div class="col-xs-'+ length+'" ><select id="'+role+'_0'+COUNTER+'" class="js-example-basic-single" >'
                      + ComboList
                      +  '</select>'
                +  '  </div>');
$(".js-example-basic-single").select2();

};

function generateDynamicTextBox(COUNTER){
  $('#subAttri_0'+COUNTER+'').append('<div class="col-xs-3"><input type="text" class="form-control input-sm" id="inValue_0'+COUNTER+'"/><div>');
}

function generateDynamicButton(COUNTER){
  $('#subAttri_0'+COUNTER+'').append('<div class="col-xs-1"><button id="btnRemove_0'+COUNTER+'"type="button" class="btn btn-danger btn-xs"> DELETE </button><div>');
  $('#btnRemove_0'+COUNTER+'').click(function(){
        $('#subAttri_0'+COUNTER+'').remove();

  })
}
function deleteAllRowOfContents(){
  $('.search-if-row').remove();
  COUNTER=0;
}
