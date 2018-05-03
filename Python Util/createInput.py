class create:
    def CheckboxButton(self):
        pass

    def Input(self, id: str, labelText: str, typeText: str, prependIcon: object, appendIcon: object,
              required: object,
              placeholder: str, value: str) -> object:

        input_html = """<div class="form-row">
                <div class="col-sm">
                    <label class="form-control-label" for="{id}">{label}</label>
                    <div class="input-group">
                        {prepend}
                        <input type="{type}" class="form-control mb-0" id="{id}"
                               placeholder="{placeholder}" {value} {required}>
                        {append}
                    </div>
                </div>"""

        def isBool(self) -> bool:
            if self is not type(bool) or self is not 'True' or self is not 'False':
                return False
            else:
                print('bool')
                return True

        def removeLink(self) -> str:
            self = "{%s}" % self
            return input_html.replace(self, '')

        def insert(self: object, tag: str, value: str) -> object:

            return input_html.replace(tag, value)

        if (isBool(prependIcon) is False):
            print(prependIcon)
            prependIcon = """<div class="input-group-text"><i class="{prependIcon}"></i></div>""".replace(
                '{prependIcon}', '%s' % prependIcon)
            input_html = input_html.replace('{prepend}', prependIcon + '</div>')
            print(prependIcon)
        else:
            removeLink('prepend')

        if (isBool(appendIcon) is False):
            appendIcon = """<div class="input-group-text"><div class="input-group-append"><i class="{
            appendIcon}"></i></div></div>""".replace(
                '{appendIcon}', '%s' % appendIcon)
            input_html = input_html.replace('{prepend}', '%s' % prependIcon + '</div>')

        else:
            removeLink('append')
        if (isBool(required) is False):
            required = 'required'
            input_html = input_html.replace('{required}', '%s' % required + '</div>')
        else:
            removeLink('required')

        insert('{label}', str(labelText))
        insert('{type}', str(typeText))
        insert('{id}', str(id))
        insert('{placeholder}', str(placeholder))
        insert('{value}', 'value="%s"' % value)
        insert('{prepend}', prependIcon)
        insert('{append}', appendIcon)
        insert('{required}', '%s' % required)

        return input_html


if __name__ == "__main__":
    print(create.Input(create.Input,'id', 'Hello Label', 'text', 'fa fa-upload', 'fa fa-upload', False, 'tdzr'))
