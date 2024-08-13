## 发布npm

### 1. 登录npm

```bash
npm login
```

### 2. 发布

```bash
npm publish
```

### 3. 撤销发布

```bash
npm unpublish <package>@<version>
```

### 4. 更新

```bash
npm version <update_type> // update_type: patch, minor, major
npm publish
```

### 5. 发布到私有仓库

```bash
npm publish --registry=http://registry.npm.taobao.org
```

### 6. 发布到私有仓库

```bash