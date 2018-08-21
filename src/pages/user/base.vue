<template>
  <div>
    <router-view class="main"></router-view>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'user-base',
    data() {
      return {
        navList: [
          {
            index: 'teacher',
            name: '教师管理',
            icon: 'el-icon-menu',
            children: [
              { name: '教师列表', url: '/user/teacher/list', icon: 'el-icon-search' }
            ]
          },
          {
            index: 'student',
            name: '学生管理',
            icon: 'el-icon-menu',
            children: [
              { name: '学生列表', url: '/user/student/list', icon: 'el-icon-search' }
            ]
          },
          {
            index: 'parent',
            name: '家长管理',
            icon: 'el-icon-menu',
            children: [
              { name: '家长列表', url: '/user/parent/list', icon: 'el-icon-search' }
            ]
          }
        ]
      }
    },
    created() {
      this.$store.dispatch('setLeftNav', this.navList)
    },
    methods: {}
  }
</script>
