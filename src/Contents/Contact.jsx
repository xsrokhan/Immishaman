import React, { useState, useEffect, useContext } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Modal from './Modal'
import { FaChevronDown } from "react-icons/fa6"
import { LangProvider } from '../LangProvider'
import { PlaceholderProvider } from '../LangProvider'
import { Context } from '../Context'

const serviceTranslation = {
    "en": {
        "I-90": "I-90 | Application to Replace Permanent Resident Card",
        "I-102": "I-102 | Application for Replacement/Initial Nonimmigrant Arrival-Departure Document",
        "I-129": "I-129 | Petition for a Nonimmigrant Worker",
        "I-129CW": "I-129CW | Petition for a CNMI-Only Nonimmigrant Transitional Worker",
        "I-129F": "I-129F | Petition for Alien Fiancé(e)",
        "I-130": "I-130 | Petition for Alien Relative",
        "I-131": "I-131 | Application for Travel Documents, Parole Documents, and Arrival/Departure Records",
        "I-140": "I-140 | Immigrant Petition for Alien Workers",
        "I-212": "I-212 | Application for Permission to Reapply for Admission into the United States After Deportation or Removal",
        "I-360": "I-360 | Petition for Amerasian, Widow(er), or Special Immigrant",
        "I-407": "I-407 | Record of Abandonment of Lawful Permanent Resident Status",
        "I-485": "I-485 | Application to Register Permanent Residence or Adjust Status",
        "I-526": "I-526 | Immigrant Petition by Alien Investor (Legacy)",
        "I-539": "I-539 | Application to Extend/Change Nonimmigrant Status",
        "I-589": "I-589 | Application for Asylum and Withholding of Removal",
        "I-600": "I-600 | Petition to Classify Orphan as an Immediate Relative",
        "I-600A": "I-600A | Application for Advance Processing of an Orphan Petition",
        "I-601": "I-601 | Application for Waiver of Grounds of Inadmissibility",
        "I-601A": "I-601A | Application for Provisional Unlawful Presence Waiver",
        "I-612": "I-612 | Application for Waiver of the Foreign Residence Requirement (under Section 212(e) of the Immigration and Nationality Act, as Amended)",
        "I-730": "I-730 | Refugee/Asylee Relative Petition",
        "I-751": "I-751 | Petition to Remove Conditions on Residence",
        "I-765": "I-765 | Application for Employment Authorization",
        "I-765V": "I-765V | Application for Employment Authorization for Abused Nonimmigrant Spouse",
        "I-800": "I-800 | Petition to Classify Convention Adoptee as an Immediate Relative",
        "I-800A": "I-800A | Application for Determination of Suitability to Adopt a Child from a Convention Country",
        "I-817": "I-817 | Application for Family Unity Benefits",
        "I-821": "I-821 | Application for Temporary Protected Status",
        "I-821D": "I-821D | Consideration of Deferred Action for Childhood Arrivals",
        "I-824": "I-824 | Application for Action on an Approved Application or Petition",
        "I-829": "I-829 | Petition by Entrepreneur to Remove Conditions on Permanent Resident Status",
        "I-864": "I-864 | Affidavit of Support",
        "I-914": "I-914 | Application for T Nonimmigrant Status",
        "I-918": "I-918 | Petition for U Nonimmigrant Status",
        "I-929": "I-929 | Petition for Qualifying Family Member of a U-1 Nonimmigrant",
        "I-956": "I-956 | Application for Regional Center Designation",
        "I-956F": "I-956F | Application for Approval of an Investment in a Commercial Enterprise",
        "N-400": "N-400 | Application for Naturalization",
        "N-565": "N-565 | Application for Replacement Naturalization/Citizenship Document",
        "N-600": "N-600 | Application for Certificate of Citizenship",
        "N-600K": "N-600K | Application for Citizenship and Issuance of Certificate Under Section 322",
        "translation": "Translation",
        "other": "Something else"
      },
      "ru": {
        "I-90": "I-90 | Заявление на замену карты постоянного жителя",
        "I-102": "I-102 | Заявление на замену/первичное получение документа о прибытии/убытии неиммигранта",
        "I-129": "I-129 | Петиция на работника неиммигранта",
        "I-129CW": "I-129CW | Петиция на переходного работника только для CNMI",
        "I-129F": "I-129F | Петиция на жениха/невесту иностранного гражданина",
        "I-130": "I-130 | Петиция на родственника-иностранца",
        "I-131": "I-131 | Заявление на получение документов для путешествия, разрешения на въезд, и записей прибытия/убытия",
        "I-140": "I-140 | Иммиграционная петиция для иностранных работников",
        "I-212": "I-212 | Заявление на разрешение повторного въезда в США после депортации или удаления",
        "I-360": "I-360 | Петиция для амеразиатов, вдов(цов) или специальных иммигрантов",
        "I-407": "I-407 | Запись об отказе от статуса постоянного жителя",
        "I-485": "I-485 | Заявление на регистрацию постоянного места жительства или изменение статуса",
        "I-526": "I-526 | Иммиграционная петиция инвестора (устаревшая)",
        "I-539": "I-539 | Заявление на продление/изменение статуса неиммигранта",
        "I-589": "I-589 | Заявление на убежище и отсрочку депортации",
        "I-600": "I-600 | Петиция на признание сироты ближайшим родственником",
        "I-600A": "I-600A | Заявление на предварительную обработку петиции о сироте",
        "I-601": "I-601 | Заявление на отказ от оснований недопустимости",
        "I-601A": "I-601A | Заявление на предварительный отказ от нелегального пребывания",
        "I-612": "I-612 | Заявление на отказ от требования проживания за границей (в соответствии с разделом 212(e) Закона об иммиграции и гражданстве)",
        "I-730": "I-730 | Петиция на родственника-беженца/убеженца",
        "I-751": "I-751 | Петиция на снятие условий на жительство",
        "I-765": "I-765 | Заявление на разрешение на работу",
        "I-765V": "I-765V | Заявление на разрешение на работу для жертв домашнего насилия",
        "I-800": "I-800 | Петиция на признание усыновленного по Гаагской конвенции ребенком ближайшим родственником",
        "I-800A": "I-800A | Заявление на определение пригодности для усыновления ребенка из страны-участницы Конвенции",
        "I-817": "I-817 | Заявление на получение льгот по программе «Семейное единство»",
        "I-821": "I-821 | Заявление на временный защищенный статус",
        "I-821D": "I-821D | Рассмотрение отсроченных действий для прибывших в детстве",
        "I-824": "I-824 | Заявление на выполнение решения по одобренной заявке или петиции",
        "I-829": "I-829 | Петиция инвестора на снятие условий с постоянного места жительства",
        "I-864": "I-864 | Аффидевит поддержки",
        "I-914": "I-914 | Заявление на статус неиммигранта T",
        "I-918": "I-918 | Петиция на статус неиммигранта U",
        "I-929": "I-929 | Петиция на квалифицированного члена семьи U-1 неиммигранта",
        "I-956": "I-956 | Заявление на назначение регионального центра",
        "I-956F": "I-956F | Заявление на одобрение инвестиций в коммерческое предприятие",
        "N-400": "N-400 | Заявление на натурализацию",
        "N-565": "N-565 | Заявление на замену документа о натурализации/гражданстве",
        "N-600": "N-600 | Заявление на получение свидетельства о гражданстве",
        "N-600K": "N-600K | Заявление на получение гражданства и выдачу свидетельства в соответствии с разделом 322",
        "translation": "Перевод",
        "other": "Другое"
      },
    "fa": {
        "I-90": "I-90 | درخواست برای تعویض کارت مقیم دائم",
        "I-102": "I-102 | درخواست برای تعویض/مدارک اولیه ورود/خروج غیرمهاجر",
        "I-129": "I-129 | درخواست برای کارگر غیرمهاجر",
        "I-129CW": "I-129CW | درخواست برای کارگر انتقالی غیرمهاجر ویژه CNMI",
        "I-129F": "I-129F | درخواست برای نامزد خارجی",
        "I-130": "I-130 | درخواست برای بستگان خارجی",
        "I-131": "I-131 | درخواست برای اسناد مسافرتی، اسناد آزادی مشروط، و سوابق ورود/خروج",
        "I-140": "I-140 | درخواست مهاجران برای کارگران خارجی",
        "I-212": "I-212 | درخواست برای اجازه ورود مجدد به ایالات متحده پس از اخراج یا طرد",
        "I-360": "I-360 | درخواست برای آمریکائیان، بیوه(ها) یا مهاجران ویژه",
        "I-407": "I-407 | ثبت ترک وضعیت مقیم دائم قانونی",
        "I-485": "I-485 | درخواست برای ثبت اقامت دائم یا اصلاح وضعیت",
        "I-526": "I-526 | درخواست مهاجرت برای سرمایه‌گذار خارجی (قدیمی)",
        "I-539": "I-539 | درخواست برای تمدید/تغییر وضعیت غیرمهاجر",
        "I-589": "I-589 | درخواست پناهندگی و جلوگیری از اخراج",
        "I-600": "I-600 | درخواست برای طبقه‌بندی یتیم به عنوان یک بستگان فوری",
        "I-600A": "I-600A | درخواست برای پردازش پیشرفته درخواست یتیم",
        "I-601": "I-601 | درخواست برای معافیت از دلایل عدم پذیرش",
        "I-601A": "I-601A | درخواست برای معافیت موقت از حضور غیرقانونی",
        "I-612": "I-612 | درخواست برای معافیت از الزام اقامت خارجی (طبق بخش 212(e) قانون مهاجرت و تابعیت، اصلاح شده)",
        "I-730": "I-730 | درخواست برای بستگان پناهنده/پناهجو",
        "I-751": "I-751 | درخواست برای حذف شرایط اقامت",
        "I-765": "I-765 | درخواست برای مجوز کار",
        "I-765V": "I-765V | درخواست برای مجوز کار برای همسر مهاجر قربانی خشونت",
        "I-800": "I-800 | درخواست برای طبقه‌بندی فرزند پذیرفته شده طبق کنوانسیون به عنوان بستگان فوری",
        "I-800A": "I-800A | درخواست برای تعیین صلاحیت برای پذیرش کودک از یک کشور کنوانسیون",
        "I-817": "I-817 | درخواست برای مزایای اتحاد خانواده",
        "I-821": "I-821 | درخواست برای وضعیت محافظت موقت",
        "I-821D": "I-821D | درخواست برای رسیدگی به اقدام معلق برای ورود در دوران کودکی",
        "I-824": "I-824 | درخواست برای اقدام روی یک درخواست یا عریضه تأیید شده",
        "I-829": "I-829 | درخواست کارآفرین برای حذف شرایط اقامت دائم",
        "I-864": "I-864 | تعهد حمایت مالی",
        "I-914": "I-914 | درخواست برای وضعیت غیرمهاجر T",
        "I-918": "I-918 | درخواست برای وضعیت غیرمهاجر U",
        "I-929": "I-929 | درخواست برای اعضای واجد شرایط خانواده غیرمهاجر U-1",
        "I-956": "I-956 | درخواست برای تعیین مرکز منطقه‌ای",
        "I-956F": "I-956F | درخواست برای تأسیس سرمایه‌گذاری در یک بنگاه تجاری",
        "N-400": "N-400 | درخواست برای تابعیت",
        "N-565": "N-565 | درخواست برای جایگزینی سند تابعیت/شهروندی",
        "N-600": "N-600 | درخواست برای گواهی تابعیت",
        "N-600K": "N-600K | درخواست برای تابعیت و صدور گواهی طبق ماده 322",
        "translation": "ترجمه",
        "other": "چیز دیگری"
      },
      "ar": {
        "I-90": "I-90 | طلب استبدال بطاقة الإقامة الدائمة",
        "I-102": "I-102 | طلب استبدال/وثيقة قدوم-مغادرة للمقيم غير الدائم",
        "I-129": "I-129 | عريضة لعامل غير مهاجر",
        "I-129CW": "I-129CW | عريضة لعامل انتقالي غير مهاجر في منطقة CNMI فقط",
        "I-129F": "I-129F | عريضة لخطيب(ة) أجنبي(ة)",
        "I-130": "I-130 | عريضة لقريب أجنبي",
        "I-131": "I-131 | طلب وثائق السفر، وثائق الإفراج المشروط، وسجلات القدوم/المغادرة",
        "I-140": "I-140 | عريضة مهاجرين للعاملين الأجانب",
        "I-212": "I-212 | طلب الإذن لإعادة التقديم لدخول الولايات المتحدة بعد الترحيل أو الإبعاد",
        "I-360": "I-360 | عريضة لأميراسي، أرملة(أرمل)، أو مهاجر خاص",
        "I-407": "I-407 | سجل التخلي عن حالة الإقامة الدائمة القانونية",
        "I-485": "I-485 | طلب تسجيل الإقامة الدائمة أو تعديل الوضع",
        "I-526": "I-526 | عريضة المهاجرين للمستثمر الأجنبي (قديم)",
        "I-539": "I-539 | طلب تمديد/تغيير حالة غير المهاجر",
        "I-589": "I-589 | طلب اللجوء ووقف الترحيل",
        "I-600": "I-600 | عريضة لتصنيف يتيم كقريب مباشر",
        "I-600A": "I-600A | طلب لمعالجة مسبقة لعريضة يتيم",
        "I-601": "I-601 | طلب إعفاء من أسباب عدم المقبولية",
        "I-601A": "I-601A | طلب إعفاء مؤقت للحضور غير القانوني",
        "I-612": "I-612 | طلب إعفاء من شرط الإقامة بالخارج (وفق القسم 212(e) من قانون الهجرة والجنسية المعدل)",
        "I-730": "I-730 | عريضة لقريب لاجئ/طالب لجوء",
        "I-751": "I-751 | عريضة لإزالة الشروط على الإقامة",
        "I-765": "I-765 | طلب تصريح العمل",
        "I-765V": "I-765V | طلب تصريح العمل للزوج غير المهاجر المعنف",
        "I-800": "I-800 | عريضة لتصنيف الطفل المتبنى بموجب الاتفاقية كقريب مباشر",
        "I-800A": "I-800A | طلب لتحديد الأهلية لتبني طفل من دولة تحت الاتفاقية",
        "I-817": "I-817 | طلب لمزايا وحدة الأسرة",
        "I-821": "I-821 | طلب للحصول على وضع الحماية المؤقتة",
        "I-821D": "I-821D | النظر في إجراء مؤجل للوافدين في الطفولة",
        "I-824": "I-824 | طلب لإجراء على طلب أو عريضة تمت الموافقة عليها",
        "I-829": "I-829 | عريضة المستثمر لإزالة الشروط على وضع الإقامة الدائمة",
        "I-864": "I-864 | تعهد بالدعم",
        "I-914": "I-914 | طلب للحصول على وضع T لغير المهاجرين",
        "I-918": "I-918 | عريضة للحصول على وضع U لغير المهاجرين",
        "I-929": "I-929 | عريضة لأحد أفراد الأسرة المؤهلين من غير المهاجرين U-1",
        "I-956": "I-956 | طلب لتصنيف مركز إقليمي",
        "I-956F": "I-956F | طلب للموافقة على استثمار في مشروع تجاري",
        "N-400": "N-400 | طلب التجنس",
        "N-565": "N-565 | طلب استبدال وثيقة الجنسية/التجنس",
        "N-600": "N-600 | طلب شهادة الجنسية",
        "N-600K": "N-600K | طلب للحصول على الجنسية وإصدار شهادة بموجب المادة 322",
        "translation": "ترجمة",
        "other": "شيء آخر"
      },
      "es": {
        "I-90": "I-90 | Solicitud para reemplazar la tarjeta de residente permanente",
        "I-102": "I-102 | Solicitud de reemplazo/documento inicial de llegada-salida para no inmigrantes",
        "I-129": "I-129 | Petición para un trabajador no inmigrante",
        "I-129CW": "I-129CW | Petición para un trabajador de transición exclusivo de CNMI no inmigrante",
        "I-129F": "I-129F | Petición para prometido(a) extranjero(a)",
        "I-130": "I-130 | Petición para un familiar extranjero",
        "I-131": "I-131 | Solicitud de documentos de viaje, documentos de permiso y registros de llegada/salida",
        "I-140": "I-140 | Petición de inmigrante para trabajadores extranjeros",
        "I-212": "I-212 | Solicitud de permiso para volver a solicitar admisión a los Estados Unidos después de deportación o expulsión",
        "I-360": "I-360 | Petición para Amerasiático, viudo(a) o inmigrante especial",
        "I-407": "I-407 | Registro de abandono del estatus de residente permanente legal",
        "I-485": "I-485 | Solicitud para registrar residencia permanente o ajustar estatus",
        "I-526": "I-526 | Petición de inmigrante por inversionista extranjero (heredado)",
        "I-539": "I-539 | Solicitud para extender/cambiar el estatus de no inmigrante",
        "I-589": "I-589 | Solicitud de asilo y suspensión de la expulsión",
        "I-600": "I-600 | Petición para clasificar a un huérfano como pariente inmediato",
        "I-600A": "I-600A | Solicitud para procesamiento previo de una petición de huérfano",
        "I-601": "I-601 | Solicitud de exención de motivos de inadmisibilidad",
        "I-601A": "I-601A | Solicitud de exención provisional por presencia ilegal",
        "I-612": "I-612 | Solicitud de exención del requisito de residencia en el extranjero (según la sección 212(e) de la Ley de Inmigración y Nacionalidad, según enmendada)",
        "I-730": "I-730 | Petición para familiar refugiado/asilado",
        "I-751": "I-751 | Petición para eliminar las condiciones de residencia",
        "I-765": "I-765 | Solicitud de autorización de empleo",
        "I-765V": "I-765V | Solicitud de autorización de empleo para cónyuge no inmigrante maltratado",
        "I-800": "I-800 | Petición para clasificar a un adoptado bajo la Convención como pariente inmediato",
        "I-800A": "I-800A | Solicitud de determinación de idoneidad para adoptar un niño de un país bajo la Convención",
        "I-817": "I-817 | Solicitud de beneficios de unidad familiar",
        "I-821": "I-821 | Solicitud de estatus de protección temporal",
        "I-821D": "I-821D | Consideración de acción diferida para los llegados en la infancia",
        "I-824": "I-824 | Solicitud de acción sobre una solicitud o petición aprobada",
        "I-829": "I-829 | Petición de empresario para eliminar las condiciones de estatus de residente permanente",
        "I-864": "I-864 | Declaración jurada de apoyo",
        "I-914": "I-914 | Solicitud de estatus de no inmigrante T",
        "I-918": "I-918 | Petición para estatus de no inmigrante U",
        "I-929": "I-929 | Petición para miembro familiar calificado de un no inmigrante U-1",
        "I-956": "I-956 | Solicitud para designación de centro regional",
        "I-956F": "I-956F | Solicitud de aprobación de una inversión en una empresa comercial",
        "N-400": "N-400 | Solicitud de naturalización",
        "N-565": "N-565 | Solicitud de reemplazo de documento de naturalización/ciudadanía",
        "N-600": "N-600 | Solicitud de certificado de ciudadanía",
        "N-600K": "N-600K | Solicitud de ciudadanía y emisión de certificado según la sección 322",
        "translation": "Traducción",
        "other": "Otra cosa"
      },
      "fr": {
        "I-90": "I-90 | Demande de remplacement de carte de résident permanent",
        "I-102": "I-102 | Demande de remplacement/premier document d'arrivée-départ pour non-immigrant",
        "I-129": "I-129 | Pétition pour un travailleur non-immigrant",
        "I-129CW": "I-129CW | Pétition pour un travailleur transitoire uniquement CNMI non-immigrant",
        "I-129F": "I-129F | Pétition pour fiancé(e) étranger(ère)",
        "I-130": "I-130 | Pétition pour un parent étranger",
        "I-131": "I-131 | Demande de documents de voyage, documents de libération conditionnelle et dossiers d'arrivée/départ",
        "I-140": "I-140 | Pétition pour travailleurs étrangers immigrants",
        "I-212": "I-212 | Demande d'autorisation de nouvelle admission aux États-Unis après expulsion ou retrait",
        "I-360": "I-360 | Pétition pour Amérasien, veuf(ve) ou immigrant spécial",
        "I-407": "I-407 | Enregistrement d'abandon du statut de résident permanent légal",
        "I-485": "I-485 | Demande de résidence permanente ou d'ajustement de statut",
        "I-526": "I-526 | Pétition pour investisseur étranger immigrant (héritage)",
        "I-539": "I-539 | Demande de prolongation/modification du statut non-immigrant",
        "I-589": "I-589 | Demande d'asile et de suspension de l'expulsion",
        "I-600": "I-600 | Pétition pour classer un orphelin comme parent immédiat",
        "I-600A": "I-600A | Demande de traitement préalable d'une pétition d'orphelin",
        "I-601": "I-601 | Demande de renonciation aux motifs d'inadmissibilité",
        "I-601A": "I-601A | Demande de renonciation provisoire pour présence illégale",
        "I-612": "I-612 | Demande de renonciation à l'obligation de résidence à l'étranger (section 212(e) de la loi sur l'immigration et la nationalité, telle qu'amendée)",
        "I-730": "I-730 | Pétition pour un parent réfugié/demandeur d'asile",
        "I-751": "I-751 | Pétition pour lever les conditions sur la résidence",
        "I-765": "I-765 | Demande d'autorisation de travail",
        "I-765V": "I-765V | Demande d'autorisation de travail pour conjoint non-immigrant victime de violence",
        "I-800": "I-800 | Pétition pour classer un enfant adopté en vertu de la convention comme parent immédiat",
        "I-800A": "I-800A | Demande de détermination de l'aptitude à adopter un enfant d'un pays sous convention",
        "I-817": "I-817 | Demande de prestations d'unité familiale",
        "I-821": "I-821 | Demande de statut de protection temporaire",
        "I-821D": "I-821D | Examen de l'action différée pour les arrivées dans l'enfance",
        "I-824": "I-824 | Demande d'action sur une demande ou pétition approuvée",
        "I-829": "I-829 | Pétition pour entrepreneur visant à lever les conditions sur le statut de résident permanent",
        "I-864": "I-864 | Déclaration de soutien",
        "I-914": "I-914 | Demande de statut de non-immigrant T",
        "I-918": "I-918 | Pétition pour statut de non-immigrant U",
        "I-929": "I-929 | Pétition pour membre de la famille admissible d'un U-1 non-immigrant",
        "I-956": "I-956 | Demande de désignation de centre régional",
        "I-956F": "I-956F | Demande d'approbation d'un investissement dans une entreprise commerciale",
        "N-400": "N-400 | Demande de naturalisation",
        "N-565": "N-565 | Demande de remplacement de document de naturalisation/citoyenneté",
        "N-600": "N-600 | Demande de certificat de citoyenneté",
        "N-600K": "N-600K | Demande de citoyenneté et d'émission de certificat en vertu de l'article 322",
        "translation": "Traduction",
        "other": "Autre chose"
      },
      "tr": {
        "I-90": "I-90 | Daimi Oturma Kartını Yenileme Başvurusu",
        "I-102": "I-102 | Göçmen Olmayan Varış-Çıkış Belgesinin Yenilenmesi/İlk Kez Alınması Başvurusu",
        "I-129": "I-129 | Göçmen Olmayan Çalışan Dilekçesi",
        "I-129CW": "I-129CW | Sadece CNMI Geçici Göçmen Olmayan Çalışan Dilekçesi",
        "I-129F": "I-129F | Yabancı Nişanlı/Fiancé(e) için Dilekçe",
        "I-130": "I-130 | Yabancı Akraba için Dilekçe",
        "I-131": "I-131 | Seyahat Belgeleri, Parole Belgeleri ve Varış/Çıkış Kayıtları için Başvuru",
        "I-140": "I-140 | Yabancı Çalışanlar için Göçmen Dilekçesi",
        "I-212": "I-212 | Sınır Dışı Edilme veya Çıkarılmadan Sonra ABD'ye Yeniden Giriş İzni için Başvuru",
        "I-360": "I-360 | Amerasian, Dul (Eş) veya Özel Göçmen için Dilekçe",
        "I-407": "I-407 | Daimi Oturma Statüsünün Terk Edildiğine Dair Kayıt",
        "I-485": "I-485 | Daimi Oturma veya Statü Değişikliği Kaydı Başvurusu",
        "I-526": "I-526 | Yabancı Yatırımcı Göçmen Dilekçesi (Eski)",
        "I-539": "I-539 | Göçmen Olmayan Statüsünün Uzatılması/Değiştirilmesi Başvurusu",
        "I-589": "I-589 | Sığınma ve Sınır Dışı Edilmeme Başvurusu",
        "I-600": "I-600 | Yetim Çocuğun Yakın Akraba Olarak Sınıflandırılması için Dilekçe",
        "I-600A": "I-600A | Yetim Çocuğa İlişkin Dilekçenin Ön İşlemesi için Başvuru",
        "I-601": "I-601 | Kabul Edilmeme Nedenlerinden Feragat için Başvuru",
        "I-601A": "I-601A | Geçici Yasadışı Kalış Affı için Başvuru",
        "I-612": "I-612 | Göçmenlik ve Vatandaşlık Yasasının 212(e) Bölümü Altında Yabancı İkamet Şartından Feragat için Başvuru",
        "I-730": "I-730 | Mülteci/Sığınmacı Akraba Dilekçesi",
        "I-751": "I-751 | İkamet Şartlarının Kaldırılması için Dilekçe",
        "I-765": "I-765 | Çalışma İzni Başvurusu",
        "I-765V": "I-765V | Şiddet Mağduru Göçmen Olmayan Eş için Çalışma İzni Başvurusu",
        "I-800": "I-800 | Sözleşme Uyarınca Evlat Edinilen Çocuğun Yakın Akraba Olarak Sınıflandırılması için Dilekçe",
        "I-800A": "I-800A | Sözleşme Ülkelerinden Çocuk Evlat Edinmeye Uygunluğun Belirlenmesi için Başvuru",
        "I-817": "I-817 | Aile Birliği Hakları için Başvuru",
        "I-821": "I-821 | Geçici Koruma Statüsü için Başvuru",
        "I-821D": "I-821D | Çocuklukta Gelenler için Ertelenmiş Eylem Düşüncesi",
        "I-824": "I-824 | Onaylanmış Bir Başvuru veya Dilekçe Üzerine İşlem Yapılması için Başvuru",
        "I-829": "I-829 | Girişimcinin Daimi Oturma Statüsündeki Şartların Kaldırılması için Dilekçe",
        "I-864": "I-864 | Destek Beyanı",
        "I-914": "I-914 | T Göçmen Olmayan Statüsü için Başvuru",
        "I-918": "I-918 | U Göçmen Olmayan Statüsü için Dilekçe",
        "I-929": "I-929 | U-1 Göçmen Olmayan Statüsü Olan Kişinin Uygun Aile Üyesi için Dilekçe",
        "I-956": "I-956 | Bölgesel Merkez Atama Başvurusu",
        "I-956F": "I-956F | Ticari Bir İşletmeye Yatırım Onayı Başvurusu",
        "N-400": "N-400 | Vatandaşlığa Geçiş Başvurusu",
        "N-565": "N-565 | Vatandaşlık/Naturalizasyon Belgesi Değişimi için Başvuru",
        "N-600": "N-600 | Vatandaşlık Sertifikası için Başvuru",
        "N-600K": "N-600K | 322. Madde Altında Vatandaşlık ve Sertifika Düzenleme Başvurusu",
        "translation": "Çeviri",
        "other": "Başka bir şey"
      }
}

const optionsArray = [
    "I-90",
    "I-102",
    "I-129",
    "I-129CW",
    "I-129F",
    "I-130",
    "I-131",
    "I-140",
    "I-212",
    "I-360",
    "I-407",
    "I-485",
    "I-526",
    "I-539",
    "I-589",
    "I-600",
    "I-600A",
    "I-601",
    "I-601A",
    "I-612",
    "I-730",
    "I-751",
    "I-765",
    "I-765V",
    "I-800",
    "I-800A",
    "I-817",
    "I-821",
    "I-821D",
    "I-824",
    "I-829",
    "I-864",
    "I-914",
    "I-918",
    "I-929",
    "I-956",
    "I-956F",
    "N-400",
    "N-565",
    "N-600",
    "N-600K",
    "translation",
    "other"
  ]


function Contact({ classes }) {
    const [options, setOptions] = useState(optionsArray)
    const [openModal, setOpenModal] = useState(false)
    const [modalExitAnim, setModalExitAnim] = useState(false)
    const [selectedServiceTxt, setSelectedServiceTxt] = useState("") // value from serviceTranslation 
    const [selectedServiceId, setSelectedServiceId] = useState("") // used as key in serviceTranslation
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState(false)

    const { lang } = useContext(Context) 

    const controls = useAnimation()
    const { ref, inView } = useInView({
      triggerOnce: true,    // Animation triggers only once
      threshold: 0.1,       // Adjusts when the animation should start (0.2 means when 20% of the component is in view)
    })
  
    useEffect(() => {
      if (inView) {
        controls.start("visible")
      }
    }, [controls, inView])
  
    const fadeIn = {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    }

    const fadeInForm = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1, delay: 0.4 } },
      }

    function handleServiceSelection(option) {
        const selectedOption = option
        const newOptions = options.filter(o => o != selectedOption)
        setOptions([selectedOption, ...newOptions])
    }

    useEffect(() => { // update the displayed selected service on lang change
        setSelectedServiceTxt(serviceTranslation[lang][selectedServiceId])
    }, [lang])

    function handleCloseModal(val) {
        setSelectedServiceTxt(serviceTranslation[lang][val])
        setSelectedServiceId(val)
        setModalExitAnim(true)
        handleServiceSelection(val)
        setTimeout(() => {
          setOpenModal(false)
          setModalExitAnim(false)
        }, 500)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSending(true)

        const formData = new FormData(e.target)
        const object = Object.fromEntries(formData.entries())
        const json = JSON.stringify(object)

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });
            const data = await response.json()
            if (response.status === 200) {
                setSent(true)
            } else {
                console.error(data.message)
                setError(true)
            }
        } catch (error) {
            console.error("Error:", error)
            setError(true)
        } finally {
            setSending(false)
        }
    }

  return (
    <section className={classes.contact}>
          <motion.h1
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={fadeIn}
          >
            <LangProvider location="contact_heading" />
          </motion.h1>
        <motion.form onSubmit={handleSubmit}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInForm}
        >
            <input type="hidden" name="access_key" value="ba9e8651-e790-4498-ba88-d516c5ec74aa" />
            <input type="hidden" name="subject" value="New Submission from Web3Forms" />
            <div className={classes.f_and_lname}>
                <div>
                    <input type="text" name="fname" id="fname" required />
                    <label htmlFor="fname"><LangProvider location="fname" /></label>
                </div>
                <div>
                    <input type="text" name="lname" id="lname" required />
                    <label htmlFor="lname"><LangProvider location="lname" /></label>
                </div>
            </div>
            <div>
                <input type="email" name="email" id="email" required />
                <label htmlFor="email"><LangProvider location="email" /></label>
            </div>
            <div className={classes.service} onClick={() => setOpenModal(true)}>
                <input type="text" name="service" id="service" value={selectedServiceTxt} onChange={() => null} required />
                <label htmlFor="service"><LangProvider location="service" /></label>
                <span><FaChevronDown /></span>
            </div>
            <div>
                <input type="text" name="refnum" id="refnum" required />
                <label htmlFor="refnum"><LangProvider location="ref_num" /></label>
            </div>
            {selectedServiceTxt === "Something else" && <textarea placeholder={PlaceholderProvider({ lang, location: "msg" })} name="message" required/>}
            {sent && <div className={classes.msg}><LangProvider location="sent" /></div>}
            {error && <div className={classes.msg}><LangProvider location="error" /></div>}
            <button type="submit" style={{pointerEvents: (sending || sent ? "none": "auto")}}>{(!sending && !sent) ? <LangProvider location="submit" /> : sending ? <i className={`fa-solid fa-spinner fa-spin`}></i> : <i className={`fa-solid fa-check`}></i>}</button>
        </motion.form>
        {openModal && 
        <Modal classes={classes} modalExitAnim={modalExitAnim}>
            <h3><LangProvider location="choose_service" /></h3>
            <ul>{options.map((option, i) => (
                <li key={option} onClick={() => handleCloseModal(option)} style={{color: (i === 0 && selectedServiceTxt) && "white", backgroundColor: (i === 0 && selectedServiceTxt) && "#122d57"}}>{serviceTranslation[lang][option]}</li>
            ))}
            </ul>
        </Modal>}
    </section>
  )
}

export default Contact