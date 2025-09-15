---
title: Projects | Venki Vijay
display: Projects
description: List of projects that I created
wrapperClass: 'text-center'
projects:
  Ansible:
    - name: 'Infra'
      link: 'https://github.com/venkivijay/infra'
      desc: 'Ansible playbook to configure my workstations'
      icon: 'i-mdi-ansible'
  Misc:
    - name: 'Resume as Code (RaC)'
      link: 'https://github.com/venkivijay/resume'
      desc: 'Resume as Code made using LaTeX and GitHub Actions'
      icon: 'i-mdi-resume'
    - name: 'Links'
      link: 'https://github.com/venkivijay/links'
      desc: 'Linktree like bio, hosting my social links'
      icon: 'i-mdi-link'
---

<ListProjects :projects="frontmatter.projects" />
