<template>
    <div class="container-fluid px-0 d-flex flex-column">
        <div class="d-flex main-cover">
            <div
                class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 gap-md-4 my-5 py-5 blood-glucose-monitor-cover">
                <div class="d-flex flex-column gap-3 col col-md-6 order-md-12 order-1 pt-0 pb-5 py-md-5">
                    <h2 class="fw-bold mb-2 text-uppercase text-center text-md-start">
                        JUNLALA Blood Glucose Monitor
                        <span
                            class="d-inline-block align-items-center br-2 color-white bg-primary-linear py-1 px-2 h2 fw-bold px-4 mx-auto">Coming
                            soon</span>
                    </h2>
                    <div class="d-flex flex-column gap-1">
                        <span class="fw-bold fs-4 color-secondary">What you need to know about the Blood Glucose
                            Monitor:</span>
                        <ul class="h6 color-secondary text-center text-md-start">
                            <li class="d-flex gap-2">
                                <IListDot class="flex-shrink-0 d-flex" /><span>As Continuous Glucose Monitoring (CGM)
                                    technology gains traction, JUNLALA unveils its advanced Blood Glucose Monitor to
                                    empower individuals and primary care practices in managing diabetes. Achieving
                                    glycemic targets is vital to preventing complications, yet many patients face
                                    challenges. JUNLALA's monitor bridges this gap with real-time, continuous glucose
                                    insights, enhancing diabetes management while contributing valuable data to
                                    diabetes-related and broader medical research.</span>
                            </li>

                        </ul>
                    </div>
                    <a-button :disabled="true" type="primary"
                        class="d-flex justify-content-center align-items-center fw-bold col-8">
                        Coming soon
                    </a-button>
                </div>
                <div class="d-flex col-8 col-md order-12 order-md-1 mx-auto">
                </div>
            </div>
        </div>
        <div class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 involved-cover gap-md-4 my-5 py-5">
            <div class="d-flex flex-column align-items-center col">
                <h2 class="fw-bold mb-4 text-uppercase text-center">
                    Introduction
                </h2>
                <span class="d-flex flex-column h6 color-secondary mb-5 text-center">
                    The JUNLALA Blood Glucose Monitor revolutionizes glucose tracking with advanced features that reduce
                    or eliminate the need for traditional fingerstick testing. By leveraging CGM technology, it delivers
                    comprehensive data on glycemia, hyperglycemia, hypoglycemia, and glucose variability, empowering
                    users and healthcare providers to make informed decisions.
                </span>
            </div>
        </div>
        <div class="container-fluid px-0 d-flex flex-column">
            <div class="container-xl d-flex flex-column">
                <ul class="d-flex flex-wrap">
                    <li :class="`d-flex col-12 ${item.class}`" v-for="(item, idx) in [
                        { class: 'col-md-6 col-lg-4', label: 'Personalized Health Management', content: 'Helps users maintain better glucose control, preventing complications and enhancing their quality of life.', svg: iIcon1 },
                        { class: 'col-md-6 col-lg-4', label: 'Data-Driven Insights', content: 'Integrates with JUNLALA’s AI ecosystem to provide actionable recommendations for improved health outcomes.', svg: iIcon2 },
                        { class: 'col-md-6 col-lg-4', label: 'Family and Caregiver Support', content: 'Facilitates remote monitoring for added peace of mind and stronger connections with loved ones.', svg: iIcon3 },
                    ]">
                        <span :class="`d-flex flex-column align-items-center align-items-md-start p-4 m-3 br-4`">
                            <component :is="item.svg" :class="` 'color-primary'}`" />
                            <h3 :class="`fw-bold lh-3 py-4`">{{ item.label }}</h3>
                            <span :class="`h6 color-secondary `">{{ item.content }}</span>
                        </span>
                    </li>
                </ul>
            </div>

        </div>
        <div
            class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 gap-md-4 ai-empowering my-3 my-md-5 py-3 py-md-5">
            <div class="d-flex flex-column col col-md-7 order-12 order-md-1 pt-0 pb-3 py-md-5">
                <h2 class="fw-bold text-center mb-4 text-md-start text-uppercase">More comfortable to wear</h2>
                <span class="mb-3 d-flex">
                    <span class="h6 color-secondary">Miniaturized design for a more comfortable fit. With shorter,
                        softer needles, usage is nearly painless. The wearable component has a diameter of 22mm,
                        approximately the size of a 1-yuan coin.</span>
                </span>
            </div>
            <div class="col order-1 order-md-12 me-0 me-md-4 me-lg-5"></div>
        </div>
        <div class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 involved-cover gap-md-4">
            <div class="d-flex flex-column align-items-center col">
                <h2 class="fw-bold mb-4 text-uppercase text-center">
                    Multiple functions with more comprehensive data
                </h2>
                <span class="d-flex flex-column h6 color-secondary mb-5 text-center">
                    Simple operation with an integrated design for ease of use. Automatically measures glucose every
                    minute, ensuring no blood sugar fluctuation is missed, and provides more comprehensive data.
                </span>
            </div>
        </div>
        <div class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 involved-cover gap-md-4">
            <div class="d-flex flex-column gap-3 col-12 col-md-5 p-4 br-3 h6 color-secondary">
                <img src="../assets/view/blood-glucose-monitor/picture2.png" alt="" srcset="">
                <img src="../assets/view/blood-glucose-monitor/picture3.png" alt="" srcset="">
            </div>
            <div class="d-flex flex-column justify-content-center gap-3 col p-4 br-3 h6 color-secondary">
                <img src="../assets/view/blood-glucose-monitor/picture4.png" alt="" srcset="">
            </div>
        </div>
        <div class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 involved-cover gap-md-4 mt-4">
            <div class="d-flex justify-content-center text-center col-12">
                <div class="col" v-for="item in [
                    { label: 'iIcon4', content: 'Smart Auto-Pairing', svg: iIcon4 },
                    { label: 'iIcon5', content: 'IP68 Waterproof', svg: iIcon5 },
                    { label: 'iIcon6', content: 'Minute-by-Minute Glucose Monitoring', svg: iIcon6 },
                    { label: 'iIcon7', content: '1440 Daily Updates', svg: iIcon7 },
                ]" :key="item.label">
                    <component :is="item.svg" />
                    <div class="fw-normal fs-5 text-black py-3">
                        {{ item.content }}
                    </div>
                </div>
            </div>
        </div>
        <div class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 involved-cover gap-md-4 mt-4 mb-5">
            <div class="d-flex justify-content-center text-center col-12">
                <div class="col" v-for="item in [
                    { label: 'iIcon8', content: 'Remote Sharing', svg: iIcon8 },
                    { label: 'iIcon9', content: '24-Hour Continuous Monitoring', svg: iIcon9 },
                    { label: 'iIcon10', content: '15-Day Battery Life', svg: iIcon10 },
                    { label: 'iIcon11', content: 'All-in-One Design', svg: iIcon11 },
                ]" :key="item.label">
                    <component :is="item.svg" />
                    <div class="fw-normal fs-5 text-black py-3">
                        {{ item.content }}
                    </div>
                </div>
            </div>
        </div>
        <div class="container-xl d-flex flex-column flex-md-row px-3 gap-md-4 ai-vision mt-5 mb-5">
            <div class="col order-1 order-md-12 me-0 me-md-4 me-lg-5"></div>
            <div class="d-flex flex-column col col-md-7 order-12 order-md-1 pt-0 pb-3 py-md-5">
                <h2 class="fw-bold lh-3 py-4 h3">Vision</h2>
                <span class="mb-3 d-flex">
                    <span class="h6 color-secondary">JUNLALA aims to transform diabetes care with innovative CGM
                        technology that shifts the focus from reactive to proactive management. By integrating advanced
                        monitoring features into a user-friendly device, JUNLALA is helping individuals take charge of
                        their health while contributing to a future of smarter, more connected healthcare.</span>
                </span>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import iIcon1 from '../assets/view/blood-glucose-monitor/icon-1.svg';
import iIcon2 from '../assets/view/blood-glucose-monitor/icon-2.svg';
import iIcon3 from '../assets/view/blood-glucose-monitor/icon-3.svg';
import iIcon4 from '../assets/view/blood-glucose-monitor/icon-4.svg';
import iIcon5 from '../assets/view/blood-glucose-monitor/icon-5.svg';
import iIcon6 from '../assets/view/blood-glucose-monitor/icon-6.svg';
import iIcon7 from '../assets/view/blood-glucose-monitor/icon-7.svg';
import iIcon8 from '../assets/view/blood-glucose-monitor/icon-8.svg';
import iIcon9 from '../assets/view/blood-glucose-monitor/icon-9.svg';
import iIcon10 from '../assets/view/blood-glucose-monitor/icon-10.svg';
import iIcon11 from '../assets/view/blood-glucose-monitor/icon-11.svg';
</script>
<style scoped lang="scss">
.main-cover {
    background: url('../assets/view/blood-glucose-monitor/main-bg.png') no-repeat center center;
    min-height: 300px;
    background-size: cover;
}

.blood-glucose-monitor-cover {
    >div:last-child {
        background: url('../assets/view/blood-glucose-monitor/main-cover.png') no-repeat center center;
        min-height: 300px;
        background-size: cover;
    }
}

.ai-empowering {
    >div {
        &:last-child {
            background: url('../assets/view/blood-glucose-monitor/picture1.png') no-repeat center center;
            background-size: contain;
            min-height: 300px;
        }
    }
}

.ai-vision {
    >div {
        &:first-child {
            background: url('../assets/view/blood-glucose-monitor/picture5.png') no-repeat center center;
            background-size: contain;
            min-height: 300px;
        }
    }
}
</style>
