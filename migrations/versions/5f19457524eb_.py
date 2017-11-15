"""empty message

Revision ID: 5f19457524eb
Revises: cbb5c7e9a591
Create Date: 2017-11-15 11:58:08.989000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5f19457524eb'
down_revision = 'cbb5c7e9a591'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users') as batch_op:
        batch_op.drop_column('confirmed')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('confirmed', sa.BOOLEAN(), nullable=True))
    # ### end Alembic commands ###