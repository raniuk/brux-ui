import * as React from 'react'
import { mergeClassNames } from '../lib/index.js'
import { CircleCheck } from 'lucide-react'
import { Heading, type HeadingProps } from './heading.js'

export interface PasswordRequirement {
  id?: string
  label: React.ReactNode
  met?: boolean
}

export interface PasswordRequirementsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  requirements: PasswordRequirement[]
  showStatus?: boolean
  title?: React.ReactNode
  titleAs?: NonNullable<HeadingProps['as']>
}

const PasswordRequirements = React.forwardRef<HTMLDivElement, PasswordRequirementsProps>(
  ({ title, titleAs = 'h2', requirements, showStatus = false, className, ...props }, ref) => (
    <div ref={ref} className={mergeClassNames('brux-password-requirements', className)} {...props}>
      {title ? (
        <Heading as={titleAs} size="sm" className="brux-password-requirements-title">
          {title}
        </Heading>
      ) : null}
      <ul className={mergeClassNames('brux-password-requirements-list', !showStatus && 'brux-password-requirements-list--bulleted')}>
        {requirements.map((requirement, index) => (
          <li
            key={requirement.id ?? index}
            data-met={requirement.met || undefined}
            className={mergeClassNames(showStatus && 'brux-password-requirements-item')}
          >
            {showStatus ? (
              <span className="brux-password-requirements-status">
                <CircleCheck aria-hidden="true" />
              </span>
            ) : null}
            <span>{requirement.label}</span>
          </li>
        ))}
      </ul>
    </div>
  ),
)

PasswordRequirements.displayName = 'PasswordRequirements'

export { PasswordRequirements }
