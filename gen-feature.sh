#!/bin/bash

# Start scripte
NOW=$(date +"%m-%d-%Y %H:%M:%S")
echo 'Start Feature'
echo -e "Please enter your feature: "
read name
echo -e "Please enter description your feature: "
read description
echo -e "Please enter your author name: "
read AUTHOR
COPPYRIGHT="/* 
  Created by ${AUTHOR} at ${NOW}
  Màn hình ${description}
*/"
echo 'Create feature'

SOURCEDIR="src/features/$name" 
echo $SOURCEDIR
mkdir "$SOURCEDIR"
chmod -R 777 "$SOURCEDIR"


upper_name=""
upper_all_name=""
if [[ $name == *"-"* ]]; then
  echo "co dau _"
  IFS='-' # hyphen (-) is set as delimiter
  read -ra ADDR <<< "$name" # str is read into an array as tokens separated by IFS
  for i in "${ADDR[@]}"; do # access each element of array
    echo ${i}
    upper_tmp="$(tr '[:lower:]' '[:upper:]' <<< ${i:0:1})${i:1}"
    upper_all_tmp="$(tr '[:lower:]' '[:upper:]' <<< "$i")"
    upper_name=${upper_name}${upper_tmp}
    if [ "$upper_all_name" == "" ]; then
      upper_all_name="${upper_all_name}${upper_all_tmp}"
    else
      upper_all_name="${upper_all_name}_${upper_all_tmp}"
    fi
    
  done
  IFS=' ' #
else
  upper_name="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"
  upper_all_name="$(tr '[:lower:]' '[:upper:]' <<< "$name")"
fi

# Generate index
# touch "$SOURCEDIR/index.ts"
# echo "
# ${COPPYRIGHT}

# import ${upper_name}Container from 'features/${name}/view/${name}.screen';
# import { connect } from 'react-redux';
# import { Dispatch } from 'redux';

# const mapStateToProps = (state: any) => ({});

# const mapDispatchToProps = (dispatch: Dispatch) => ({});

# export const ${upper_name}Screen = connect(
#   mapStateToProps, mapDispatchToProps
# )(${upper_name}Container)
# " >> "$SOURCEDIR/index.ts"
# echo 'Finist parent'

# Generate folder View
echo 'Start folder View'
mkdir "$SOURCEDIR/view"
mkdir "$SOURCEDIR/view/components"
touch "$SOURCEDIR/view/$name.screen.tsx"

echo "${COPPYRIGHT}

import * as React from \"react\";
import { View, StyleSheet } from \"react-native\";
import { "${upper_name}"Props, "${upper_name}"State, ${upper_name}Adapter } from \"../model\";

export default class "${upper_name}"Screen extends React.PureComponent<
  "${upper_name}"Props,
  "${upper_name}"State
> {
  private adapter: ${upper_name}Adapter

  constructor(props: "${upper_name}"Props) {
    super(props);
    this.adapter = new ${upper_name}Adapter(this)
  }

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

" >> "$SOURCEDIR/view/$name.screen.tsx"

# Generate folder Model

echo 'Start Model'
mkdir "$SOURCEDIR/model"

# Prop
touch "$SOURCEDIR/model/$name.type.ts"
echo "
${COPPYRIGHT}

import { NavigationInitActionPayload } from \'react-navigation\';

export interface ${upper_name}Props {
  route: NavigationInitActionPayload
}

export interface ${upper_name}State {}
" >> "$SOURCEDIR/model/$name.type.ts"

# Adapter
touch "$SOURCEDIR/model/$name.adapter.ts"
echo "
${COPPYRIGHT}

import ${upper_name}Screen from \"../view/${name}.screen\";

export class ${upper_name}Adapter {
  private view: ${upper_name}Screen;
  constructor(view: ${upper_name}Screen) {
    this.view = view;
  }
}
" >> "$SOURCEDIR/model/$name.adapter.ts"
# Index - Model
touch "$SOURCEDIR/model/index.ts"
echo "
${COPPYRIGHT}

export * from \"./${name}.adapter\"
export * from \"./${name}.type\"

" >> "$SOURCEDIR/model/index.ts"

echo 'End Model'

# import Screen name
SCREEN_NAME_PATH="src/routing/screen-name.ts"
echo "export const ${upper_name}Screen = \"${upper_name}Screen\"; // Màn hình ${description}" >> ${SCREEN_NAME_PATH}


echo "End Scripts"
